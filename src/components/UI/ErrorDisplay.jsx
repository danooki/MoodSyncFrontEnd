import React from "react";
import Button from "./Button";

/**
 * Simple ErrorDisplay Component
 *
 * Basic error display with optional retry button
 * Props: error (required), title, showRetryButton, retryAction, retryButtonText, className
 */
const ErrorDisplay = ({
  error,
  title = "Error",
  showRetryButton = false,
  retryAction,
  retryButtonText = "Try Again",
  className = "",
}) => {
  if (!error) return null;

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 ${className}`}>
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

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>

        <p className="text-red-600 mb-4">{error}</p>

        {showRetryButton && retryAction && (
          <Button onClick={retryAction} variant="primary" icon="🔄">
            {retryButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
