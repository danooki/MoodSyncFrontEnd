import React from "react";

/**
 * Reusable Textarea component with consistent styling
 * Follows the same pattern as the Input component
 */
const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
  fullWidth = true,
  size = "md",
  rows = 4,
  maxLength,
  ...props
}) => {
  const baseClasses =
    "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none";

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3",
    lg: "px-4 py-4 text-lg",
  };

  const stateClasses = error
    ? "border-red-300 focus:ring-red-500 focus:border-red-300"
    : "border-gray-300 focus:ring-indigo-500 focus:border-transparent";

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed bg-gray-50"
    : "";

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${stateClasses}
          ${widthClass}
          ${disabledClass}
        `.trim()}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
