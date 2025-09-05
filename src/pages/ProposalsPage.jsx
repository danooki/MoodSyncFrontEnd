import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProposals from "../hooks/useProposals.js";
// components
import {
  Button,
  Card,
  PageHeader,
  LoadingPage,
  ErrorPage,
} from "../components/UI";
import Avatar from "../components/UI/Avatar.jsx";
import ProposalCard from "../components/Cards/ProposalCard.jsx";

/**
 * ProposalsPage - displays personalized activity suggestions based on circle mood
 * Shows circle info, member avatars, dominant traits, and generated proposals
 */
const ProposalsPage = () => {
  const navigate = useNavigate();
  const { proposals, isLoading, error, refetch } = useProposals();
  const handleBackToTrackingBoard = () => {
    navigate("/tracking-board");
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const getDominantTraitInfo = (trait) => {
    const traitInfo = {
      D: { name: "Dominant", color: "bg-red-100 text-red-800", emoji: "" },
      i: {
        name: "Influential",
        color: "bg-yellow-100 text-yellow-800",
        emoji: "",
      },
      S: { name: "Steady", color: "bg-green-100 text-green-800", emoji: "" },
      C: {
        name: "Conscientious",
        color: "bg-blue-100 text-blue-800",
        emoji: "",
      },
    };
    return (
      traitInfo[trait] || {
        name: "Unknown",
        color: "bg-gray-100 text-gray-800",
        emoji: "",
      }
    );
  };

  const getCircleSizeDescription = (memberCount) => {
    if (memberCount === 1) return "Solo Circle";
    if (memberCount === 2) return "Duo Circle";
    return "Group Circle";
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

      {/* Circle Information Card */}
      <Card className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {circleInfo.name}
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-gray-600">
              {getCircleSizeDescription(circleInfo.memberCount)}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">
              {circleInfo.memberCount} member
              {circleInfo.memberCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="flex justify-center space-x-4 mb-6">
          {circleMembers.map((member) => {
            const traitInfo = getDominantTraitInfo(member.dominant);
            return (
              <div key={member.id} className="text-center">
                <Avatar
                  src={member.avatar}
                  alt={member.displayName}
                  displayName={member.displayName}
                  size="lg"
                  className="mb-2"
                />
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {member.displayName}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${traitInfo.color}`}
                >
                  {traitInfo.emoji} {traitInfo.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Circle Mood Summary */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
            <span className="text-sm font-medium text-gray-700">
              Today's Circle Mood:{" "}
              {circleMembers
                .map((m) => getDominantTraitInfo(m.dominant).emoji)
                .join(" ")}
            </span>
          </div>
        </div>
      </Card>

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
