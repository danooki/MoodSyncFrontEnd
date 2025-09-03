import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Button, Card } from "../UI";

const CircleInvitations = ({
  invitations,
  isLoading,
  onRefresh,
  onAccept,
  onDecline,
}) => {
  // Only render if there are actual invitations
  if (invitations.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          📨 Pending Circle Invitations
        </h3>
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          variant="info"
          size="sm"
          icon={
            <svg
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          }
        >
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {invitations.map((invitation) => (
          <div
            key={invitation._id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  Invitation to join:{" "}
                  {invitation.circle?.circleName || "Unknown Circle"}
                </p>
                <p className="text-gray-600">
                  You've been invited to join this circle
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(invitation.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => onAccept(invitation._id)}
                  variant="success"
                  size="sm"
                  icon="✅"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => onDecline(invitation._id)}
                  variant="danger"
                  size="sm"
                  icon="❌"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CircleInvitations;
