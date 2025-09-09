import { BASE_URL } from "../config/api.js";
import { useAuth } from "./useAuth.jsx";

// Simple hook for checking question completion status
const useQuestionStatus = () => {
  const { getToken } = useAuth();

  // Check if all questions are answered for today
  const checkIfAllQuestionsAnswered = async (totalQuestions) => {
    const token = getToken();

    if (!token) {
      return false;
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
        return answeredCount >= totalQuestions;
      }
      return false;
    } catch (error) {
      console.error("Error checking daily score:", error);
      return false;
    }
  };

  return {
    checkIfAllQuestionsAnswered,
  };
};

export default useQuestionStatus;
