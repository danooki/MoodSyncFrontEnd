import { useState } from "react";
import { useAuth } from "./useAuth.jsx";
import { BASE_URL } from "../config/api.js";
import {
  getApiErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";

// Simple hook for fetching and managing question data
const useQuestionData = () => {
  const { logout, getToken } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Transform question data from backend to frontend format
  const transformQuestion = (data) => {
    return {
      id: data.questionId,
      question: data.text,
      options: data.choices.map((choice) => ({
        value: choice.choiceId,
        label: choice.label,
        description: choice.label,
      })),
    };
  };

  // Fetch the next question from the API
  const fetchNextQuestion = async () => {
    const token = getToken();

    if (!token) {
      logout();
      return { success: false, error: "unauthorized" };
    }

    try {
      setError("");
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/daily-score/next-question`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data && !data.done) {
          const question = transformQuestion(data);
          setCurrentQuestion(question);
          return { success: true, question };
        } else {
          // All questions answered
          return { success: false, done: true };
        }
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          return { success: false, error: "unauthorized" };
        }
        setError(getApiErrorMessage(data, "Failed to fetch question"));
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setError(getNetworkErrorMessage());
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentQuestion,
    isLoading,
    error,
    fetchNextQuestion,
  };
};

export default useQuestionData;
