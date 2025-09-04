import { BASE_URL } from "../config/api.js";

// Simple hook for checking question completion status
const useQuestionStatus = () => {
  
  // Check if all questions are answered for today
  const checkIfAllQuestionsAnswered = async (totalQuestions) => {
    try {
      const response = await fetch(`${BASE_URL}/daily-score`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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
