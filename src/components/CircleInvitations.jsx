import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const CircleInvitations = ({
  invitations,
  isLoading,
  error,
  onRefresh,
  onAccept,
  onDecline,
}) => {
  // Only render if there are actual invitations
  if (invitations.length === 0) {
    return null;
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Invitations
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onRefresh}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          📨 Pending Circle Invitations
        </h3>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 disabled:opacity-50"
        >
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
          <span>Refresh</span>
        </button>
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
                <button
                  onClick={() => onAccept(invitation._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => onDecline(invitation._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircleInvitations;
