import React, { useState, useEffect } from "react";

/**
 * Reusable background wrapper component with random gradient styling
 * Generates a new random gradient on each render for visual variety
 */
const BackgroundWrapper = ({
  children,
  className = "",
  variant = "default",
}) => {
  const [gradient, setGradient] = useState("");

  // Array of beautiful gradient combinations with more contrasting colors
  const gradients = [
    "bg-gradient-to-br from-violet-50 to-teal-100",
    "bg-gradient-to-br from-green-50 to-indigo-100",
    "bg-gradient-to-br from-orange-50 to-purple-100",
    "bg-gradient-to-br from-rose-50 to-emerald-100",
    "bg-gradient-to-br from-amber-50 to-violet-100",
    "bg-gradient-to-br from-cyan-50 to-pink-100",
    "bg-gradient-to-br from-indigo-50 to-orange-100",
    "bg-gradient-to-br from-teal-50 to-rose-100",
    "bg-gradient-to-br from-purple-50 to-amber-100",
    "bg-gradient-to-br from-emerald-50 to-indigo-100",
    "bg-gradient-to-br from-pink-50 to-teal-100",
    "bg-gradient-to-br from-blue-50 to-orange-100",
  ];

  // Generate random gradient on component mount
  useEffect(() => {
    const randomGradient =
      gradients[Math.floor(Math.random() * gradients.length)];
    setGradient(randomGradient);
  }, []);

  const baseClasses = `min-h-screen ${gradient}`;

  const variantClasses = {
    default: "",
    centered: "flex items-center justify-center",
    padded: "py-12",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default BackgroundWrapper;
