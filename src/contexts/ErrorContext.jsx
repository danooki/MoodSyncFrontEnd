import React, { useState, createContext, useContext } from "react";

// Create the error context
const ErrorContext = createContext();

// Custom hook to use the error context
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

// Error provider component
export const ErrorProvider = ({ children }) => {
  // Global error state
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Error queue for multiple errors
  const [errorQueue, setErrorQueue] = useState([]);

  // Show a global error
  const showError = (message, type = "error") => {
    setGlobalError(message);

    // Add to error queue for history
    setErrorQueue((prev) => [
      ...prev,
      { message, type, timestamp: Date.now() },
    ]);

    // Auto-clear after 5 seconds
    setTimeout(() => {
      clearError();
    }, 5000);
  };

  // Clear the current error
  const clearError = () => {
    setGlobalError("");
  };

  // Clear all errors and queue
  const clearAllErrors = () => {
    setGlobalError("");
    setErrorQueue([]);
  };

  // Get the latest error
  const getLatestError = () => {
    return errorQueue.length > 0 ? errorQueue[errorQueue.length - 1] : null;
  };

  // Check if there are any errors
  const hasErrors = () => {
    return globalError !== "" || errorQueue.length > 0;
  };

  const value = {
    globalError,
    isLoading,
    errorQueue,
    showError,
    clearError,
    clearAllErrors,
    getLatestError,
    hasErrors,
    setIsLoading,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export { ErrorContext };
