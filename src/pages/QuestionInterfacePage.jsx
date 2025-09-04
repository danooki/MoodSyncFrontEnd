import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// hooks
import { useAuth } from "../hooks/useAuth.jsx";
import { useLogout } from "../hooks/useLogout.js";
import useQuestionData from "../hooks/useQuestionData.js";
import useAnswerSubmission from "../hooks/useAnswerSubmission.js";
import useQuestionStatus from "../hooks/useQuestionStatus.js";
import useQuestionProgress from "../hooks/useQuestionProgress.js";
// Components
import Navbar from "../components/Navigation/Navbar.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import ProgressBar from "../components/Features/ProgressBar.jsx";
import QuestionCard from "../components/Cards/QuestionCard.jsx";
import { Button, Card, BackgroundWrapper } from "../components/UI";

const QuestionInterfacePage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  // Use individual hooks directly - much simpler and clearer
  const { currentQuestion, isLoading, error, fetchNextQuestion } =
    useQuestionData();
  const { isSubmitting, submitAnswer } = useAnswerSubmission();
  const { checkIfAllQuestionsAnswered } = useQuestionStatus();
  const { progress, totalQuestions, updateProgress } = useQuestionProgress();

  useEffect(() => {
    // Start question flow when user is available
    if (user) {
      // Check if all questions are already answered
      checkIfAllQuestionsAnswered(totalQuestions).then((allAnswered) => {
        if (allAnswered) {
          // All questions answered, go to tracking board
          navigate("/tracking-board");
        } else {
          // Not all answered, fetch the next question
          fetchNextQuestion();
        }
      });
    }
  }, [user, totalQuestions]);

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <BackgroundWrapper variant="centered">
        <LoadingSpinner />
      </BackgroundWrapper>
    );
  }

  // Redirect to login if no user
  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Navbar onLogout={handleLogout} user={user} />
        <BackgroundWrapper variant="centered">
          <LoadingSpinner />
        </BackgroundWrapper>
      </>
    );
  }

  if (!currentQuestion) {
    return (
      <>
        <Navbar onLogout={handleLogout} user={user} />
        <BackgroundWrapper variant="centered">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No Questions Available
            </h2>
            <p className="text-gray-600">
              All questions have been answered for today.
            </p>
          </div>
        </BackgroundWrapper>
      </>
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
      <>
        <Navbar onLogout={handleLogout} user={user} />
        <BackgroundWrapper variant="centered">
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
        </BackgroundWrapper>
      </>
    );
  }

  // this functions submits answer, update progress and fetch next question
  const handleAnswerSubmit = async (answer) => {
    // uses question id to submit answer
    const result = await submitAnswer(currentQuestion.id, answer);
    if (result.success) {
      // Update progress after successful answer submission
      await updateProgress();
      // Get updated progress info to check if limit reached
      const progressInfo = await updateProgress();

      // Check if user has answered 4 questions
      if (progressInfo.answeredCount >= 4) {
        // All 4 questions answered, go to tracking board
        navigate("/tracking-board");
        return;
      }

      // only under 4 questions answered, fetch next question
      const nextResult = await fetchNextQuestion();
      if (nextResult.success) {
        // Question loaded successfully, continue with next question
      } else if (nextResult.done) {
        // All questions answered, go to tracking board
        navigate("/tracking-board");
      }
    }
  };

  return (
    <>
      <Navbar onLogout={handleLogout} user={user} />
      <BackgroundWrapper>
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
      </BackgroundWrapper>
    </>
  );
};

export default QuestionInterfacePage;
