import React from "react";
import { Card } from "../UI";
import Avatar from "../UI/Avatar.jsx";

/**
 * CircleInfoCard - displays circle information including name, member count, and member avatars with traits
 * Shows "Not yet" status for members who haven't answered all questions
 */
const CircleInfoCard = ({
  circleInfo,
  circleMembers,
  showQuestionStatus = false,
}) => {
  const getDominantTraitInfo = (trait) => {
    const traitInfo = {
      D: {
        name: "Dominant",
        color: "bg-red-500 text-white",
        emoji: "",
      },
      i: {
        name: "Influential",
        color: "bg-yellow-500 text-white",
        emoji: "",
      },
      S: {
        name: "Steady",
        color: "bg-green-500 text-white",
        emoji: "",
      },
      C: {
        name: "Conscientious",
        color: "bg-blue-500 text-white",
        emoji: "",
      },
    };
    return (
      traitInfo[trait] || {
        name: "Unknown",
        color: "bg-gray-500 text-white",
        emoji: "",
      }
    );
  };

  const getCircleSizeDescription = (memberCount) => {
    if (memberCount === 1) return "Solo Circle";
    if (memberCount === 2) return "Duo Circle";
    return "Group Circle";
  };

  return (
    <Card className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {circleInfo.name}
        </h2>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className="text-gray-600">
            {getCircleSizeDescription(circleInfo.memberCount)}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">
            {circleInfo.memberCount} member
            {circleInfo.memberCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Member Avatars */}
      <div className="flex justify-center space-x-4 mb-6">
        {circleMembers.map((member) => {
          const traitInfo = getDominantTraitInfo(member.dominant);
          return (
            <div key={member.id} className="text-center">
              <Avatar
                src={member.avatar}
                alt={member.displayName}
                displayName={member.displayName}
                size="lg"
                className="mb-2"
              />
              <p className="text-sm font-medium text-gray-900 mb-1">
                {member.displayName}
              </p>
              {/* Show trait badge if questions completed, otherwise show "Not yet" */}
              {member.hasAnsweredAllQuestions ? (
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${traitInfo.color}`}
                >
                  {traitInfo.emoji} {traitInfo.name}
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-300 text-gray-600">
                  Not yet
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CircleInfoCard;
