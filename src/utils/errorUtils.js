// Simple error utility functions for consistent error handling

/**
 * Get a user-friendly error message from various error types
 */
export const getErrorMessage = (error, defaultMessage = "Something went wrong") => {
  if (error?.message) return error.message;
  if (typeof error === 'string') return error;
  return defaultMessage;
};

/**
 * Get standard network error message
 */
export const getNetworkErrorMessage = () => "Network error. Please try again.";

/**
 * Get login error message based on response status
 */
export const getLoginErrorMessage = (response, data) => {
  const errorMessages = {
    404: "Email does not exist",
    400: "Invalid email or password", 
    401: "Authentication failed"
  };
  
  return errorMessages[response.status] || data?.error || "Login failed";
};

/**
 * Get registration error message
 */
export const getRegistrationErrorMessage = (data) => {
  return data?.message || "Registration failed";
};

/**
 * Get API error message from response
 */
export const getApiErrorMessage = (data, defaultMessage = "Operation failed") => {
  return data?.message || data?.error || defaultMessage;
};

/**
 * Clear error state - simple utility
 */
export const clearError = (setError) => {
  setError("");
};
