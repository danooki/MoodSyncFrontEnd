import React from "react";
import Button from "./Button";
import Input from "./Input";

/**
 * FormField component for consistent form field layout
 */
export const FormField = ({
  label,
  children,
  required = false,
  error,
  className = "",
}) => (
  <div className={`space-y-2 ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    {children}
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

/**
 * FormActions component for consistent form button layouts
 */
export const FormActions = ({
  children,
  justify = "end",
  className = "",
  ...props
}) => {
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  };

  return (
    <div
      className={`flex space-x-3 ${justifyClasses[justify]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * FormRow component for horizontal form layouts
 */
export const FormRow = ({ children, className = "", ...props }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

/**
 * FormSection component for grouping related form fields
 */
export const FormSection = ({
  title,
  subtitle,
  children,
  className = "",
  ...props
}) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {(title || subtitle) && (
      <div className="border-b border-gray-200 pb-3">
        {title && (
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        )}
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
    )}
    <div className="space-y-4">{children}</div>
  </div>
);

/**
 * SuccessMessage component for form success states
 */
export const SuccessMessage = ({ message, className = "" }) => (
  <div
    className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}
  >
    <p className="text-green-600 text-sm">{message}</p>
  </div>
);

/**
 * ErrorMessage component for form error states
 */
export const ErrorMessage = ({ message, className = "" }) => (
  <div
    className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}
  >
    <p className="text-red-600 text-sm">{message}</p>
  </div>
);

// Export individual components for convenience
export { Button, Input };
