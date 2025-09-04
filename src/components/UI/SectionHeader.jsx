import React from "react";

/**
 * Reusable SectionHeader component for consistent section titles
 * Supports different sizes and optional borders
 */
const SectionHeader = ({
  title,
  subtitle,
  children,
  size = "lg",
  showBorder = true,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "text-lg font-semibold",
    md: "text-xl font-semibold",
    lg: "text-2xl font-semibold",
    xl: "text-3xl font-bold",
  };

  const borderClass = showBorder ? "border-b border-gray-200 pb-2" : "";

  return (
    <div className={`${className}`} {...props}>
      <div className={`${sizeClasses[size]} text-gray-900 ${borderClass}`}>
        {title}
      </div>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default SectionHeader;
