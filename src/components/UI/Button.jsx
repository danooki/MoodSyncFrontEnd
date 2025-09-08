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
      "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg",
    secondary:
      "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg",
    success:
      "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg",
    danger:
      "text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg",
    info: "bg-gradient-to-r from-white to-pink-100 text-gray-600 hover:from-pink-50 hover:to-pink-150 focus:ring-pink-200 shadow-pink-50",
    message:
      "bg-gradient-to-r from-white to-gray-100 text-gray-600 hover:from-gray-50 hover:to-gray-150 focus:ring-gray-200 shadow-gray-50",
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
