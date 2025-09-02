import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const CircleStatusCard = ({ 
  circleStatus, 
  isLoading, 
  error, 
  onCreateCircle, 
  onInviteFriend, 
  onFindYourMood, 
  circleName,
  setCircleName,
  isCreatingCircle,
  createError
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <LoadingSpinner size="lg" text="Checking circle status..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Error Loading Circle Status
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onCreateCircle}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  if (circleStatus?.isInCircle) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Your Circle: {circleStatus.circleName}
            </h2>
            <p className="text-gray-600">
              You're all set! Ready to find your mood?
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={onFindYourMood}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              🎯 Find Your Mood
            </button>
            <button
              onClick={onInviteFriend}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              👥 Invite a Friend
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Create Your Circle
          </h2>
          <p className="text-gray-600">
            Start your mood-syncing journey by creating a circle with friends
          </p>
        </div>

        <form onSubmit={onCreateCircle} className="space-y-4">
          <div>
            <input
              type="text"
              value={circleName}
              onChange={(e) => setCircleName(e.target.value)}
              placeholder="Enter your circle name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={isCreatingCircle}
            />
          </div>

          {createError && <p className="text-red-600 text-sm">{createError}</p>}

          <button
            type="submit"
            disabled={isCreatingCircle}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreatingCircle ? "Creating..." : "✨ Create Circle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CircleStatusCard;
