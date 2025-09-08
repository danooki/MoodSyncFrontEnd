import React from "react";
import Button from "./Button";

/**
 * GenericCard Component
 *
 * A simple display component that shows status information with actions.
 *
 * Props: icon (required), title (required), description, actions, children, className
 */

const GenericCard = ({
  icon,
  title,
  description,
  buttons = [],
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 ${className}`}>
      <div className="text-center">
        <div className="mb-6">
          <div className="mb-4">{icon}</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
          {description && <p className="600">{description}</p>}
        </div>

        {children}

        {buttons.length > 0 && (
          <div className="space-y-4">
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                disabled={button.disabled}
                variant={button.variant}
                size={button.size}
                fullWidth
                icon={button.icon}
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenericCard;
