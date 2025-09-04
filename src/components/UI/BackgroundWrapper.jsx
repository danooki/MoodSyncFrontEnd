import React from "react";

/**
 * Reusable background wrapper component with consistent gradient styling
 * Eliminates duplication of background classes across pages
 */
const BackgroundWrapper = ({ 
  children, 
  className = "", 
  variant = "default" 
}) => {
  const baseClasses = "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100";
  
  const variantClasses = {
    default: "",
    centered: "flex items-center justify-center",
    padded: "py-12"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default BackgroundWrapper;
