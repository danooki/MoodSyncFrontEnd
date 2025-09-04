import React from "react";

/**
 * PageHeader Component
 * 
 * A standardized page header with title and optional subtitle.
 * Provides consistent styling and spacing across all pages.
 * 
 * Props:
 * - title: The main page title (required)
 * - subtitle: Optional subtitle/description
 * - className: Additional CSS classes
 */
const PageHeader = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
