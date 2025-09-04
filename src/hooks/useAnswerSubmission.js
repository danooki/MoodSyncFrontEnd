import { useState } from "react";
import { useAuth } from "./useAuth.jsx";
import { BASE_URL } from "../config/api.js";
import { getApiErrorMessage, getNetworkErrorMessage } from "../utils/errorUtils.js";

// Simple hook for submitting answers
const useAnswerSubmission = () => {
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Submit an answer to the API
  const submitAnswer = async (questionId, answer) => {
    if (!questionId) {
      return { success: false, error: "No question available" };
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(`${BASE_URL}/daily-score/answer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: questionId,
          choiceId: answer,
        }),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          return { success: false, error: "unauthorized" };
        }
        setError(getApiErrorMessage(data, "Failed to submit answer"));
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError(getNetworkErrorMessage());
      return { success: false, error: error.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    submitAnswer,
  };
};

export default useAnswerSubmission;
