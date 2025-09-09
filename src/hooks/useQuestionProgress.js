import { useState, useEffect } from "react";
import { useAuth } from "./useAuth.jsx";
import { BASE_URL } from "../config/api.js";

const useQuestionProgress = () => {
  const [progress, setProgress] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(4); // Max 4 questions per day.
  const { getToken } = useAuth();

  const updateProgress = async () => {
    const token = getToken();

    if (!token) {
      return { answeredCount: 0, totalQuestions };
    }

    try {
      const response = await fetch(`${BASE_URL}/daily-score`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const answeredCount = data.dailyScore?.answeredQuestions?.length || 0;

        // Get total questions count from the response
        if (data.dailyQuestions?.summary?.totalQuestions) {
          setTotalQuestions(data.dailyQuestions.summary.totalQuestions);
        }

        const progressPercentage = (answeredCount / totalQuestions) * 100;
        setProgress(progressPercentage);

        return {
          answeredCount,
          totalQuestions:
            data.dailyQuestions?.summary?.totalQuestions || totalQuestions,
        };
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      // Don't show error for progress update, just log it
      return { answeredCount: 0, totalQuestions };
    }
  };

  const calculateProgress = (answeredCount, total) => {
    const newTotal = total || totalQuestions;
    const progressPercentage = (answeredCount / newTotal) * 100;
    setProgress(progressPercentage);
    return progressPercentage;
  };

  const resetProgress = () => {
    setProgress(0);
  };

  const setTotalQuestionsCount = (count) => {
    setTotalQuestions(count);
  };

  return {
    progress,
    totalQuestions,
    updateProgress,
    calculateProgress,
    resetProgress,
    setTotalQuestionsCount,
  };
};

export default useQuestionProgress;
