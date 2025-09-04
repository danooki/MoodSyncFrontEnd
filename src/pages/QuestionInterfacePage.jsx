import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import useQuestionFlow from "../hooks/useQuestionFlow.js";
import useQuestionProgress from "../hooks/useQuestionProgress.js";
import Navbar from "../components/Navigation/Navbar.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import ProgressBar from "../components/Features/ProgressBar.jsx";
import QuestionCard from "../components/Cards/QuestionCard.jsx";
import { Button, Card } from "../components/UI";

const QuestionInterfacePage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const {
    currentQuestion,
    isLoading,
    isSubmitting,
    handleLogout,
    initializeQuestionFlow,
    handleAnswerSubmit,
  } = useQuestionFlow();
  const { progress, totalQuestions, updateProgress } = useQuestionProgress();

  useEffect(() => {
    // Initialize question flow when user is available
    if (user) {
      initializeQuestionFlow(totalQuestions);
    }
  }, [user, totalQuestions]);

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
    return null;
  }

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

  const handleAnswerSubmitWrapper = async (answer) => {
    const result = await handleAnswerSubmit(answer, totalQuestions);
    if (result.success) {
      // Update progress after successful answer submission
      await updateProgress();
    }
  };

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
          onAnswerSubmit={handleAnswerSubmitWrapper}
        />
      </div>
    </div>
  );
};

export default QuestionInterfacePage;
