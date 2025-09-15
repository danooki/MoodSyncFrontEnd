import React from "react";
import Button from "../UI/Button";

/**
 * GenericCard Component
 *
 * A simple display component that shows status information with actions.
 *
 * Props: icon (required), title (required), description, actions, children, className, titleClassName, descriptionClassName
 *
 * Note: description can be a string or JSX element for advanced formatting
 */

const GenericCard = ({
  icon,
  title,
  description,
  buttons = [],
  children,
  className = "",
  titleClassName = "text-gray-900",
  descriptionClassName = "text-gray-600",
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 ${className}`}>
      <div className="text-center">
        <div className="mb-6">
          <div className="mb-4">{icon}</div>
          <h2 className={`text-2xl font-semibold mb-2 ${titleClassName}`}>
            {title}
          </h2>
          {description && (
            <div className={descriptionClassName}>{description}</div>
          )}
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
