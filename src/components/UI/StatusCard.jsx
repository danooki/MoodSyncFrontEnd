import React from "react";

/**
 * StatusCard Component
 *
 * Supports different variants (success, info, warning, default)
 * and can render custom content via children prop.
 *
 * Props: icon (required), title (required), description, actions, children, className, variant
 */

const StatusCard = ({
  icon,
  title,
  description,
  actions = [],
  children,
  className = "",
  variant = "default", // default, success, info, warning
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        };
      case "info":
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        };
      case "warning":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
        };
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 ${className}`}>
      <div className="text-center">
        <div className="mb-6">
          <div
            className={`w-20 h-20 ${variantStyles.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {icon}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        {children}

        {actions.length > 0 && (
          <div className="space-y-4">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`w-full py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  action.variant === "primary"
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                    : action.variant === "success"
                    ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500"
                } ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {action.icon} {action.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
