import React from "react";

/**
 * Reusable Button component with consistent styling and variants
 * Handles loading states, disabled states, and different button types
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className = "",
  fullWidth = false,
  icon,
  ...props
}) => {
  const baseClasses =
    "font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-sm rounded-xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-green-500 to-green-800 text-white hover:from-green-600 hover:to-green-900 focus:ring-green-500 shadow-green-200",
    secondary:
      "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 focus:ring-purple-400 shadow-purple-200",
    success:
      "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-500 shadow-green-200",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-red-200",
    info: "bg-gradient-to-r from-white to-pink-100 text-gray-600 hover:from-pink-50 hover:to-pink-150 focus:ring-pink-200 shadow-pink-50",
    message:
      "bg-gradient-to-r from-white to-yellow-100 text-gray-600 hover:from-yellow-50 hover:to-yellow-150 focus:ring-yellow-200 shadow-yellow-50",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const isDisabled = disabled || loading;

  // this renders the button with selected variant, size and width.
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `.trim()}
      {...props}
    >
      {loading && <span className="mr-2">Loading...</span>}
      {icon && !loading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
