import React from "react";
import Card from "../UI/Card";

/**
 * ProposalCard component - displays individual activity proposals
 * Shows activity description with clear visual hierarchy
 */
const ProposalCard = ({ proposal, index }) => {
  const getProposalIcon = (index) => {
    const icons = ["", "", "", ""];
    return icons[index % icons.length];
  };

  const getProposalColor = (index) => {
    const colors = [
      "border-l-purple-500",
      "border-l-blue-500",
      "border-l-green-500",
      "border-l-orange-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <Card variant="default" className={`${getProposalColor(index)} border-l-4`}>
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-2xl">
            {getProposalIcon(index)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Suggestion #{index + 1}
          </h3>
          <p className="text-gray-700 leading-relaxed">{proposal}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProposalCard;
