import React from "react";

/**
 * InlineError Component
 * Displays small error messages inline within forms
 * or other components. Returns null if no error is provided.
 *
 * Props: error (required), className
 */

const InlineError = ({ error, className = "" }) => {
  if (!error) return null;

  return <p className={`text-red-600 text-sm ${className}`}>{error}</p>;
};

export default InlineError;
