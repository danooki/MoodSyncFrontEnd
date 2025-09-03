import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import { useErrorHandler } from "./useErrorHandler.js";
import { BASE_URL } from "../config/api.js";

export const useDailyScore = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { handleApiError, startOperation, finishOperation } = useErrorHandler();
  
  const [dailyScore, setDailyScore] = useState(null);
  const [isLoadingDailyScore, setIsLoadingDailyScore] = useState(true);

  // Check daily score status
  const checkDailyScore = async () => {
    try {
      startOperation();
      setIsLoadingDailyScore(true);
      
      const response = await fetch(`${BASE_URL}/daily-score`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDailyScore(data.dailyScore);
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        
        // Use centralized error handling
        handleApiError(new Error(data.message), { status: response.status, data });
      }
    } catch (error) {
      console.error("Error checking daily score:", error);
      
      // Use centralized error handling
      handleApiError(error);
    } finally {
      finishOperation();
      setIsLoadingDailyScore(false);
    }
  };

  // Check if all questions are answered
  const hasAnsweredAllQuestions =
    dailyScore?.answeredQuestions?.length >= (dailyScore?.totalQuestions || 4);

  return {
    dailyScore,
    isLoadingDailyScore,
    checkDailyScore,
    hasAnsweredAllQuestions,
  };
};
