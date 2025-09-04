import React from "react";

/**
 * Reusable SuccessMessage component for displaying success messages
 * Consistent styling across the application
 */
const SuccessMessage = ({ message, className = "" }) => (
  <div
    className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}
  >
    <p className="text-green-600 text-sm">{message}</p>
  </div>
);

export default SuccessMessage;
