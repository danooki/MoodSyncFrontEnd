# Centralized Error Handling System

This document explains how to use the new centralized error handling system in MoodSync Frontend.

## Overview

The centralized error handling system provides a consistent way to handle errors across the entire application. Instead of managing error states in each component, errors are now handled globally through the ErrorContext.

## How It Works

### 1. ErrorContext
- **Location**: `src/contexts/ErrorContext.jsx`
- **Purpose**: Manages global error state and provides error handling methods
- **Features**: 
  - Global error display
  - Error queue for history
  - Auto-clear after 5 seconds
  - Loading state management

### 2. useErrorHandler Hook
- **Location**: `src/hooks/useErrorHandler.js`
- **Purpose**: Provides common error handling patterns for API calls and form validation
- **Features**:
  - Automatic HTTP status code handling
  - Network error detection
  - Form validation error handling
  - Async operation wrapper

### 3. GlobalErrorDisplay Component
- **Location**: `src/components/UI/GlobalErrorDisplay.jsx`
- **Purpose**: Shows errors in a toast-like notification at the top-right of the screen
- **Features**:
  - Fixed positioning
  - Auto-dismiss
  - Manual close button
  - Consistent styling

## Usage Examples

### Basic Error Display

```javascript
import { useErrorHandler } from '../hooks/useErrorHandler';

const MyComponent = () => {
  const { showError, clearError } = useErrorHandler();
  
  const handleError = () => {
    showError("Something went wrong!");
  };
  
  const clearErrors = () => {
    clearError();
  };
  
  return (
    <div>
      <button onClick={handleError}>Show Error</button>
      <button onClick={clearErrors}>Clear Errors</button>
    </div>
  );
};
```

### API Error Handling

```javascript
import { useErrorHandler } from '../hooks/useErrorHandler';

const MyComponent = () => {
  const { handleApiError, startOperation, finishOperation } = useErrorHandler();
  
  const fetchData = async () => {
    try {
      startOperation(); // Shows loading, clears errors
      
      const response = await fetch('/api/data');
      if (!response.ok) {
        const data = await response.json();
        handleApiError(new Error(data.message), { status: response.status, data });
        return;
      }
      
      // Handle success...
      
    } catch (error) {
      handleApiError(error);
    } finally {
      finishOperation(); // Hides loading
    }
  };
};
```

### Custom Error Messages

```javascript
const customMessages = {
  400: "Invalid request data",
  403: "You don't have permission",
  404: "Resource not found",
  500: "Server error, try again later"
};

handleApiError(error, response, customMessages);
```

### Form Validation Errors

```javascript
const { handleValidationError } = useErrorHandler();

const validateForm = () => {
  if (!email) {
    handleValidationError("Email", "is required");
    return false;
  }
  
  if (!password) {
    handleValidationError("Password", "is required");
    return false;
  }
  
  return true;
};
```

## Migration from Local Error States

### Before (Local Error State)
```javascript
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  try {
    setIsLoading(true);
    setError(""); // Clear error manually
    
    // ... API call
    
    if (!response.ok) {
      setError("Something went wrong"); // Set error manually
    }
  } catch (err) {
    setError("Network error"); // Set error manually
  } finally {
    setIsLoading(false); // Hide loading manually
  }
};
```

### After (Centralized Error Handling)
```javascript
const { handleApiError, startOperation, finishOperation } = useErrorHandler();

const handleSubmit = async () => {
  try {
    startOperation(); // Automatically shows loading and clears errors
    
    // ... API call
    
    if (!response.ok) {
      const data = await response.json();
      handleApiError(new Error(data.message), { status: response.status, data });
      return;
    }
    
    // Handle success...
    
  } catch (error) {
    handleApiError(error); // Automatically handles different error types
  } finally {
    finishOperation(); // Automatically hides loading
  }
};
```

## Benefits

1. **Consistency**: All errors look and behave the same way
2. **Maintainability**: Error handling logic is centralized
3. **User Experience**: Errors appear in a consistent location
4. **Developer Experience**: Less boilerplate code in components
5. **Error History**: Errors are logged for debugging
6. **Auto-cleanup**: Errors automatically disappear after 5 seconds

## Error Types

- **API Errors**: Automatically handled with status codes
- **Network Errors**: Detected and handled appropriately
- **Validation Errors**: Form field validation errors
- **Custom Errors**: Any other error messages you want to show

## Best Practices

1. **Always use `startOperation()` and `finishOperation()`** for async operations
2. **Use `handleApiError()` for API calls** instead of manual error handling
3. **Use `showError()` for simple error messages** like validation errors
4. **Don't manage local error states** - let the centralized system handle it
5. **Use custom messages** for specific error cases when needed

## Troubleshooting

### Error not showing?
- Make sure `ErrorProvider` wraps your app in `main.jsx`
- Check that `GlobalErrorDisplay` is included in `RootLayout`
- Verify you're using the hooks correctly

### Loading state not working?
- Use `startOperation()` at the beginning of async operations
- Use `finishOperation()` in the finally block
- Don't manage loading state manually

### Errors not clearing?
- Use `clearError()` to manually clear errors
- Errors auto-clear after 5 seconds
- Check that you're not calling `showError()` repeatedly
