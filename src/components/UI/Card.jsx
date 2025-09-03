import React from "react";

/**
 * Reusable Card component with consistent styling and layout
 * Supports different variants and content sections
 */
const Card = ({
  children,
  variant = "default",
  className = "",
  padding = "p-8",
  shadow = "shadow-xl",
  rounded = "rounded-2xl",
  ...props
}) => {
  const baseClasses = "bg-white";

  const variantClasses = {
    default: "",
    success: "border-l-4 border-l-green-500",
    warning: "border-l-4 border-l-yellow-500",
    error: "border-l-4 border-l-red-500",
    info: "border-l-4 border-l-blue-500",
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${padding}
        ${shadow}
        ${rounded}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
