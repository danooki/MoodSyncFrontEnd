import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import { BASE_URL } from "../config/api.js";

export const useDailyScore = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [dailyScore, setDailyScore] = useState(null);
  const [isLoadingDailyScore, setIsLoadingDailyScore] = useState(true);
  const [error, setError] = useState("");

  // Check daily score status
  const checkDailyScore = async () => {
    try {
      setError("");
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

        setError(data.message || "Failed to load daily score");
      }
    } catch (error) {
      console.error("Error checking daily score:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoadingDailyScore(false);
    }
  };

  // Check if all questions are answered
  const hasAnsweredAllQuestions =
    dailyScore?.answeredQuestions?.length >= (dailyScore?.totalQuestions || 4);

  return {
    dailyScore,
    isLoadingDailyScore,
    error,
    checkDailyScore,
    hasAnsweredAllQuestions,
    dailyScoreDate: dailyScore?.date,
  };
};
