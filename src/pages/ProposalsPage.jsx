import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProposals from "../hooks/useProposals.js";
import { useDailyScore } from "../hooks/useDailyScore.js";
// components
import {
  Button,
  Card,
  PageHeader,
  LoadingPage,
  ErrorPage,
} from "../components/UI";
import ProposalCard from "../components/Cards/ProposalCard.jsx";
import CircleInfoCard from "../components/Cards/CircleInfoCard.jsx";
import ProgressBanner from "../components/Features/ProgressBanner.jsx";

/**
 * ProposalsPage - displays personalized activity suggestions based on circle mood
 * Shows circle info, member avatars, dominant traits, and generated proposals
 */
const ProposalsPage = () => {
  const navigate = useNavigate();
  const { proposals, isLoading, error, refetch } = useProposals();
  const { hasAnsweredAllQuestions, checkDailyScore } = useDailyScore();

  useEffect(() => {
    checkDailyScore();
  }, []);
  const handleBackToTrackingBoard = () => {
    navigate("/tracking-board");
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  if (isLoading) {
    return <LoadingPage text="Loading your personalized proposals..." />;
  }

  if (error) {
    return (
      <ErrorPage
        error={error}
        onRetry={refetch}
        onBack={handleBackToTrackingBoard}
        backText="Back to Tracking Board"
      />
    );
  }

  if (!proposals || !proposals.allCompleted) {
    return (
      <ErrorPage
        error={
          proposals?.message ||
          "All circle members must complete daily questions first"
        }
        onRetry={refetch}
        onBack={handleBackToTrackingBoard}
        backText="Back to Tracking Board"
      />
    );
  }

  const { circleMembers, proposals: activityProposals, circleInfo } = proposals;

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Evening Proposals"
        subtitle="Personalized activity suggestions based on your circle's mood today"
      />

      {/* Progress Banner */}
      <ProgressBanner
        currentStage="proposals"
        userHasCircle={true}
        hasAnsweredAllQuestions={hasAnsweredAllQuestions}
      />

      {/* Circle Information Card */}
      <CircleInfoCard
        circleInfo={circleInfo}
        circleMembers={circleMembers.map((member) => ({
          ...member,
          hasAnsweredAllQuestions: true, // All members must have completed questions to reach this page
        }))}
        showQuestionStatus={false}
      />

      {/* Proposals Section */}
      <Card className="mb-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tonight's Activity Suggestions
          </h3>
          <p className="text-gray-600">
            Based on your circle's mood assessment
          </p>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {activityProposals.map((proposal, index) => (
            <ProposalCard key={index} proposal={proposal} index={index} />
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="space-x-4">
          <Button
            onClick={handleBackToTrackingBoard}
            variant="secondary"
            icon="←"
          >
            Back to Tracking Board
          </Button>
          <Button onClick={handleBackToHome} variant="primary">
            Back to Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProposalsPage;
