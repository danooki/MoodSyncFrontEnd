import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useErrorHandler } from "../hooks/useErrorHandler.js";
import { BASE_URL } from "../config/api.js";
import Navbar from "../components/Navigation/Navbar.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import ProgressBar from "../components/Cards/ProgressBar.jsx";
import QuestionCard from "../components/Cards/QuestionCard.jsx";
import { Button, Card } from "../components/UI";

const QuestionInterfacePage = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { handleApiError, startOperation, finishOperation, clearError } =
    useErrorHandler();

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(4);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    // Check if user has already answered all questions
    // Only run when user is available
    if (user) {
      checkIfAllQuestionsAnswered();
    }
  }, [user]);

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Redirect to login if no user
  if (!user) {
    navigate("/login");
    return null;
  }

  const checkIfAllQuestionsAnswered = async () => {
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

        // Get total questions count from the response
        if (data.dailyQuestions?.summary?.totalQuestions) {
          setTotalQuestions(data.dailyQuestions.summary.totalQuestions);
        }

        if (answeredCount >= totalQuestions) {
          // All questions answered, redirect to tracking board
          navigate("/tracking-board");
          return;
        }
      }

      // If not all questions answered, fetch the next question
      fetchNextQuestion();
    } catch (error) {
      console.error("Error checking daily score:", error);
      // If there's an error, still try to fetch the next question
      fetchNextQuestion();
    }
  };

  const fetchNextQuestion = async () => {
    try {
      startOperation();
      setIsLoading(true);
      clearError();

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
          // Get current daily score to calculate progress
          await updateProgress();
        } else if (data && data.done) {
          // All questions answered, redirect to tracking board
          navigate("/tracking-board");
        } else {
          // No data, redirect to tracking board
          navigate("/tracking-board");
        }
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        // Use centralized error handling
        handleApiError(new Error(data.message), {
          status: response.status,
          data,
        });
      }
    } catch (error) {
      console.error("Error fetching question:", error);

      // Use centralized error handling
      handleApiError(error);
    } finally {
      finishOperation();
      setIsLoading(false);
    }
  };

  const updateProgress = async () => {
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
        const progressPercentage = (answeredCount / totalQuestions) * 100;
        setProgress(progressPercentage);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      // Don't show error for progress update, just log it
    }
  };

  const handleAnswerSubmit = async (answer) => {
    if (!currentQuestion) return;

    try {
      setIsSubmitting(true);
      clearError();

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
        await fetchNextQuestion();
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }

        // Use centralized error handling
        handleApiError(new Error(data.message), {
          status: response.status,
          data,
        });
      }
    } catch (error) {
      console.error("Error submitting answer:", error);

      // Use centralized error handling
      handleApiError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar onLogout={handleLogout} user={user} />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar onLogout={handleLogout} user={user} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Questions Available
            </h2>
            <p className="text-gray-600">
              All questions have been answered for today.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Safety check for currentQuestion structure
  if (
    !currentQuestion ||
    !currentQuestion.options ||
    !Array.isArray(currentQuestion.options)
  ) {
    console.error("QuestionInterfacePage - Invalid question structure");
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar onLogout={handleLogout} user={user} />
        <div className="flex items-center justify-center min-h-screen">
          <Card className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Question Data Error
            </h2>
            <p className="text-gray-600">
              There was an issue loading the question. Please try refreshing the
              page.
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              className="mt-4"
            >
              Refresh Page
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar onLogout={handleLogout} user={user} />
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <ProgressBar progress={progress} totalQuestions={totalQuestions} />

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          isSubmitting={isSubmitting}
          onAnswerSubmit={handleAnswerSubmit}
        />
      </div>
    </div>
  );
};

export default QuestionInterfacePage;
