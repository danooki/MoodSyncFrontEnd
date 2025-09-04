// consistent error handling

// General error message
export const getErrorMessage = (
  error,
  defaultMessage = "Something went wrong"
) => {
  if (error?.message) return error.message;
  if (typeof error === "string") return error;
  return defaultMessage;
};

// Connection error message
export const getNetworkErrorMessage = () => "Network error. Please try again.";

// login error messages
export const getLoginErrorMessage = (response, data) => {
  const errorMessages = {
    404: "Email does not exist",
    400: "Invalid email or password",
    401: "Authentication failed",
  };

  return errorMessages[response.status] || data?.error || "Login failed";
};

// registration error messages
export const getRegistrationErrorMessage = (data) => {
  return data?.message || "Registration failed";
};

// api error messages
export const getApiErrorMessage = (
  data,
  defaultMessage = "Operation failed"
) => {
  return data?.message || data?.error || defaultMessage;
};

// clear error state (useful for form validation)
export const clearError = (setError) => {
  setError("");
};
