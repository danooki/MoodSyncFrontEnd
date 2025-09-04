import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorDisplay from "../UI/ErrorDisplay";
import GenericCard from "../UI/GenericCard";
import { CircleIcon, PlusIcon, QuestionResetTimer } from "../UI";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";

const CircleStatusCard = ({
  user,
  circleStatus,
  isLoading,
  error,
  onCreateCircle,
  onInviteFriend,
  onStartQuestions,
  hasAnsweredAllQuestions,
  dailyScoreDate,
  circleName,
  setCircleName,
  isCreatingCircle,
}) => {
  if (isLoading) {
    return (
      <Card className="mb-8">
        <LoadingSpinner size="lg" text="Checking circle status..." />
      </Card>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Error Loading Circle Status"
        icon="error"
        showRetryButton={true}
        retryAction={onCreateCircle}
        retryButtonText="🔄 Try Again"
      />
    );
  }

  /*   // Debug: Log the current state
  console.log("Debug - Current state:", {
    isLoading,
    error,
    circleStatus,
    hasCircle: circleStatus?.isInCircle,
    userCircle: user?.circle,
  }); */

  if (circleStatus?.isInCircle) {
    const buttons = [];
    const isOwner = circleStatus.owner._id === user?.id;

    // Primary button always comes first
    if (hasAnsweredAllQuestions) {
      buttons.push({
        icon: "📊",
        text: "View your Board",
        onClick: onStartQuestions,
        variant: "success",
      });
    } else {
      buttons.push({
        icon: "🎯",
        text: "Start Questions",
        onClick: onStartQuestions,
        variant: "primary",
      });
    }

    // Secondary buttons follow - invite button only for owners
    if (isOwner) {
      buttons.push({
        icon: "👥",
        text: "Invite a Friend",
        onClick: onInviteFriend,
        variant: "default",
      });
    }

    return (
      <GenericCard
        icon={<CircleIcon />}
        title={`Your Circle: ${circleStatus.circleName}`}
        description={
          hasAnsweredAllQuestions
            ? "You've completed today's mood assessment! Check how your circle is doing."
            : "You're all set! Ready to answer today's questions?"
        }
        buttons={buttons}
      >
        {/* Show role and timer below the buttons */}
        <div className="mt-6 space-y-4">
          {/* Role display */}
          <div className="text-center">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isOwner
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {isOwner ? "👑 Circle Owner" : "👤 Circle Member"}
            </span>
          </div>

          {/* Invite message for non-owners */}
          {!isOwner && (
            <div className="text-center text-gray-600 text-sm">
              The owner of the circle can invite friends
            </div>
          )}

          {/* Show timer when all questions are answered */}
          {hasAnsweredAllQuestions && dailyScoreDate && (
            <QuestionResetTimer dailyScoreDate={dailyScoreDate} />
          )}
        </div>
      </GenericCard>
    );
  }

  return (
    <GenericCard
      icon={<PlusIcon />}
      title="Create Your Circle"
      description="Start your mood-syncing journey by creating a circle with friends"
      variant="info"
    >
      <form onSubmit={onCreateCircle} className="space-y-4">
        <Input
          type="text"
          value={circleName}
          onChange={(e) => setCircleName(e.target.value)}
          placeholder="Enter your circle name..."
          disabled={isCreatingCircle}
          required
        />

        <Button
          type="submit"
          loading={isCreatingCircle}
          disabled={isCreatingCircle}
          fullWidth
          icon="✨"
        >
          {isCreatingCircle ? "Creating..." : "Create Circle"}
        </Button>
      </form>
    </GenericCard>
  );
};

export default CircleStatusCard;
