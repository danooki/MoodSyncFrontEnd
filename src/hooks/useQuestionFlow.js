import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import { BASE_URL } from "../config/api.js";

const useQuestionFlow = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const checkIfAllQuestionsAnswered = async (totalQuestions) => {
    try {
      const response = await fetch(`${BASE_URL}/daily-score`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const answeredCount = data.dailyScore?.answeredQuestions?.length || 0;

        if (answeredCount >= totalQuestions) {
          // All questions answered, redirect to tracking board
          navigate("/tracking-board");
          return true;
        }
      }

      // If not all questions answered, fetch the next question
      return false;
    } catch (error) {
      console.error("Error checking daily score:", error);
      // If there's an error, still try to fetch the next question
      return false;
    }
  };

  const fetchNextQuestion = async (totalQuestions) => {
    try {
      setError("");
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/daily-score/next-question`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && !data.done) {
          // Transform backend response to frontend format
          const transformedQuestion = {
            id: data.questionId,
            question: data.text,
            options: data.choices.map((choice) => ({
              value: choice.choiceId,
              label: choice.label,
              description: choice.label, // Use label as description for now
            })),
          };
          setCurrentQuestion(transformedQuestion);
          return { success: true, question: transformedQuestion };
        } else if (data && data.done) {
          // All questions answered, redirect to tracking board
          navigate("/tracking-board");
          return { success: false, done: true };
        } else {
          // No data, redirect to tracking board
          navigate("/tracking-board");
          return { success: false, done: true };
        }
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          navigate("/login");
          return { success: false, error: "unauthorized" };
        }

        setError(data.message || "Failed to fetch question");
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Network error. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (answer, totalQuestions) => {
    if (!currentQuestion) return { success: false };

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(`${BASE_URL}/daily-score/answer`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          choiceId: answer,
        }),
      });

      if (response.ok) {
        // Answer submitted successfully, fetch next question
        const result = await fetchNextQuestion(totalQuestions);
        return { success: true, nextQuestion: result };
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          navigate("/login");
          return { success: false, error: "unauthorized" };
        }

        setError(data.message || "Failed to submit answer");
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError("Network error. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const initializeQuestionFlow = async (totalQuestions) => {
    const allAnswered = await checkIfAllQuestionsAnswered(totalQuestions);
    if (!allAnswered) {
      await fetchNextQuestion(totalQuestions);
    }
  };

  return {
    currentQuestion,
    isLoading,
    isSubmitting,
    error,
    handleLogout,
    checkIfAllQuestionsAnswered,
    fetchNextQuestion,
    handleAnswerSubmit,
    initializeQuestionFlow,
  };
};

export default useQuestionFlow;
