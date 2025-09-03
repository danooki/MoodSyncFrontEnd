import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorDisplay from "../UI/ErrorDisplay";
import StatusCard from "../UI/StatusCard";
import { CircleIcon, PlusIcon } from "../UI";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";

const CircleStatusCard = ({
  circleStatus,
  isLoading,
  error,
  onCreateCircle,
  onInviteFriend,
  onStartQuestions,
  hasAnsweredAllQuestions,
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

  if (circleStatus?.isInCircle) {
    const actions = [];

    if (hasAnsweredAllQuestions) {
      actions.push({
        icon: "📊",
        text: "View your Board",
        onClick: onStartQuestions,
        variant: "success",
      });
    } else {
      actions.push({
        icon: "🎯",
        text: "Start Questions",
        onClick: onStartQuestions,
        variant: "primary",
      });
    }

    actions.push({
      icon: "👥",
      text: "Invite a Friend",
      onClick: onInviteFriend,
      variant: "default",
    });

    return (
      <StatusCard
        icon={<CircleIcon />}
        title={`Your Circle: ${circleStatus.circleName}`}
        description={
          hasAnsweredAllQuestions
            ? "You've completed today's mood assessment! Check how your circle is doing."
            : "You're all set! Ready to answer today's questions?"
        }
        actions={actions}
        variant="success"
      />
    );
  }

  return (
    <StatusCard
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
    </StatusCard>
  );
};

export default CircleStatusCard;
