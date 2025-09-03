import React from "react";

/**
 * ErrorDisplay Component
 *
 * Supports different error types (error, warning, info) with customizable icons,
 * titles, and optional retry buttons. Can be used as a full error display or
 * inline within forms.
 *
 * Props: error (required), title, icon, showRetryButton, retryAction, retryButtonText, className, variant
 */

const ErrorDisplay = ({
  error,
  title = "Error",
  icon = "error",
  showRetryButton = false,
  retryAction,
  retryButtonText = "Try Again",
  className = "",
  variant = "error", // error, warning, info
}) => {
  const getIconConfig = () => {
    switch (icon) {
      case "error":
        return {
          svg: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          ),
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
      case "warning":
        return {
          svg: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          ),
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-600",
        };
      case "info":
        return {
          svg: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ),
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
        };
      default:
        return {
          svg: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          ),
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "error":
        return {
          container: "bg-white rounded-2xl shadow-xl p-8 mb-8",
          titleColor: "text-gray-900",
          messageColor: "text-red-600",
        };
      case "warning":
        return {
          container: "bg-white rounded-2xl shadow-xl p-8 mb-8",
          titleColor: "text-gray-900",
          messageColor: "text-yellow-600",
        };
      case "info":
        return {
          container: "bg-white rounded-2xl shadow-xl p-8 mb-8",
          titleColor: "text-gray-900",
          messageColor: "text-blue-600",
        };
      case "inline":
        return {
          container: "",
          titleColor: "text-red-600",
          messageColor: "text-red-600",
        };
      default:
        return {
          container: "bg-white rounded-2xl shadow-xl p-8 mb-8",
          titleColor: "text-gray-900",
          messageColor: "text-red-600",
        };
    }
  };

  const iconConfig = getIconConfig();
  const variantStyles = getVariantStyles();

  if (!error) return null;

  return (
    <div className={`${variantStyles.container} ${className}`}>
      <div className="text-center">
        {variant !== "inline" && (
          <div
            className={`w-20 h-20 ${iconConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <svg
              className={`w-10 h-10 ${iconConfig.textColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {iconConfig.svg}
            </svg>
          </div>
        )}

        {variant !== "inline" && (
          <h2
            className={`text-2xl font-semibold ${variantStyles.titleColor} mb-2`}
          >
            {title}
          </h2>
        )}

        <p
          className={`${variantStyles.messageColor} ${
            variant === "inline" ? "text-sm" : "mb-4"
          }`}
        >
          {error}
        </p>

        {showRetryButton && retryAction && variant !== "inline" && (
          <button
            onClick={retryAction}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            🔄 {retryButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
