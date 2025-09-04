import React from "react";
import { Card, Button } from "./index";

/**
 * ErrorPage Component
 * 
 * A standardized error page with retry functionality.
 * Used for page-level error states.
 * 
 * Props:
 * - error: Error message to display (required)
 * - onRetry: Function to call when retry button is clicked (optional)
 * - onBack: Function to call when back button is clicked (optional)
 * - retryText: Text for retry button (optional, defaults to "Try Again")
 * - backText: Text for back button (optional, defaults to "Go Back")
 * - showBackButton: Whether to show back button (optional, defaults to true)
 */
const ErrorPage = ({ 
  error, 
  onRetry, 
  onBack, 
  retryText = "Try Again", 
  backText = "Go Back",
  showBackButton = true 
}) => {
  return (
    <Card className="text-center">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">
        Error
      </h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="space-x-4">
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            {retryText}
          </Button>
        )}
        {showBackButton && onBack && (
          <Button onClick={onBack} variant="secondary">
            {backText}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ErrorPage;
