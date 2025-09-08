/**
 * TraitBadge component - displays DISC personality traits as circular badges with gradients
 * Smaller than Avatar component with trait-specific colors and styling
 */

import { getTraitGradient, getTraitName } from "../../utils/discUtils";

const TraitBadge = ({
  trait,
  size = "md",
  showLabel = false,
  className = "",
}) => {
  // Size configurations - smaller than Avatar
  const sizeClasses = {
    sm: "w-6 h-6 text-xs", // 24px - smaller than Avatar sm (32px)
    md: "w-8 h-8 text-sm", // 32px - smaller than Avatar md (40px)
    lg: "w-10 h-10 text-base", // 40px - smaller than Avatar lg (64px)
  };

  if (!trait) {
    return null;
  }

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const gradientClass = getTraitGradient(trait);
  const traitName = getTraitName(trait);

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <div
        className={`${sizeClass} ${gradientClass} rounded-full flex items-center justify-center text-white font-bold`}
        title={traitName}
      >
        {trait}
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-gray-600 text-center">
          {traitName}
        </span>
      )}
    </div>
  );
};

export default TraitBadge;
