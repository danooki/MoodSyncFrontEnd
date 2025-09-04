import React from "react";

/**
 * Reusable ErrorMessage component for displaying error messages
 * Consistent styling across the application
 */
const ErrorMessage = ({ message, className = "" }) => (
  <div
    className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}
  >
    <p className="text-red-600 text-sm">{message}</p>
  </div>
);

export default ErrorMessage;
