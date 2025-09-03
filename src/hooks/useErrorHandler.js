import { useError } from "../contexts/ErrorContext.jsx";

export const useErrorHandler = () => {
  const { showError, clearError, setIsLoading } = useError();

  // Handle API errors with automatic status code handling
  const handleApiError = (error, response, customMessages = {}) => {
    let errorMessage = "Something went wrong. Please try again.";

    // Handle network errors
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      errorMessage =
        "Network error: Unable to connect to server. Please check your internet connection.";
    } else if (error.name === "AbortError") {
      errorMessage = "Request was cancelled. Please try again.";
    } else if (response) {
      // Handle HTTP status codes
      const status = response.status;
      const data = response.data || {};

      switch (status) {
        case 400:
          errorMessage =
            customMessages[400] ||
            data.message ||
            "Invalid request. Please check your input.";
          break;
        case 401:
          errorMessage =
            customMessages[401] ||
            "You are not authorized. Please log in again.";
          break;
        case 403:
          errorMessage =
            customMessages[403] ||
            "You don't have permission to perform this action.";
          break;
        case 404:
          errorMessage =
            customMessages[404] || "The requested resource was not found.";
          break;
        case 409:
          errorMessage = customMessages[409] || "This resource already exists.";
          break;
        case 422:
          errorMessage =
            customMessages[422] || "Validation error. Please check your input.";
          break;
        case 429:
          errorMessage =
            customMessages[429] || "Too many requests. Please try again later.";
          break;
        case 500:
          errorMessage =
            customMessages[500] || "Server error. Please try again later.";
          break;
        default:
          errorMessage =
            customMessages[status] ||
            data.message ||
            `Error ${status}: Something went wrong.`;
      }
    }

    showError(errorMessage);
    return errorMessage;
  };

  // Handle form validation errors
  const handleValidationError = (fieldName, message) => {
    const errorMessage = `${fieldName}: ${message}`;
    showError(errorMessage, "validation");
    return errorMessage;
  };

  // Handle async operations with error handling
  const handleAsyncOperation = async (
    operation,
    loadingMessage = "Loading..."
  ) => {
    try {
      setIsLoading(true);
      clearError();

      const result = await operation();

      setIsLoading(false);
      return { success: true, data: result };
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        // API error with response
        const errorMessage = handleApiError(error, error.response);
        return { success: false, message: errorMessage };
      } else {
        // Network or other error
        const errorMessage = handleApiError(error);
        return { success: false, message: errorMessage };
      }
    }
  };

  // Clear errors when starting new operations
  const startOperation = () => {
    clearError();
    setIsLoading(true);
  };

  // Finish operation and clear loading state
  const finishOperation = () => {
    setIsLoading(false);
  };

  return {
    handleApiError,
    handleValidationError,
    handleAsyncOperation,
    startOperation,
    finishOperation,
    showError,
    clearError,
  };
};
