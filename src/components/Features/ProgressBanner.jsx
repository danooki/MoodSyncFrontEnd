import React from "react";
import Card from "../UI/Card";

// Shows user journey progress with circular indicators

const ProgressBanner = ({
  currentStage,
  userHasCircle = false,
  hasAnsweredAllQuestions = false,
}) => {
  // Define the 5 stages of the user journey
  const allStages = [
    {
      id: "circle",
      name: userHasCircle ? "Circle Ready" : "Circle Setup",
      description: "Join or create a circle",
      completed: userHasCircle,
    },
    {
      id: "questions",
      name:
        currentStage === "questions" ||
        currentStage === "tracking" ||
        currentStage === "match" ||
        currentStage === "proposals"
          ? "Questions Answered"
          : "Daily Questions",
      description: "Answer mood assessment",
      completed:
        currentStage === "questions" ||
        currentStage === "tracking" ||
        currentStage === "match" ||
        currentStage === "proposals",
    },
    {
      id: "tracking",
      name: "Tracking Board",
      description: "View circle progress",
      completed:
        currentStage === "tracking" ||
        currentStage === "match" ||
        currentStage === "proposals",
    },
    {
      id: "match",
      name: "Match Preview",
      description: "See personality traits",
      completed: currentStage === "match" || currentStage === "proposals",
    },
    {
      id: "proposals",
      name: "Evening Proposals",
      description: "Get activity suggestions",
      completed: currentStage === "proposals",
    },
  ];

  // Filter out the questions stage if all questions are answered
  const stages = hasAnsweredAllQuestions
    ? allStages.filter((stage) => stage.id !== "questions")
    : allStages;

  // Find current stage index for mobile view
  const currentStageIndex = stages.findIndex(
    (stage) => stage.id === currentStage
  );
  // Handle case where currentStage is not found (default to 0)
  const safeCurrentStageIndex =
    currentStageIndex === -1 ? 0 : currentStageIndex;
  const mobileStartIndex = Math.max(0, safeCurrentStageIndex - 1);
  const mobileEndIndex = Math.min(stages.length - 1, safeCurrentStageIndex + 1);
  const mobileStages = stages.slice(mobileStartIndex, mobileEndIndex + 1);

  return (
    <div className="mb-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-3 shadow-sm">
      <div className="flex items-center justify-center">
        {/* Desktop: Show all stages */}
        <div className="hidden md:flex items-center space-x-2">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full transition-all duration-200 ${
                    stage.completed
                      ? "bg-gradient-to-r from-green-500 to-green-700"
                      : "bg-gray-100"
                  }`}
                />
                <p
                  className={`text-xs mt-1 font-medium ${
                    stage.completed ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {stage.name}
                </p>
              </div>

              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div
                  className={`w-6 h-px mx-1 ${
                    stage.completed ? "bg-green-300" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Show 2-3 relevant stages */}
        <div className="flex md:hidden items-center space-x-1">
          {mobileStages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full transition-all duration-200 ${
                    stage.completed
                      ? "bg-gradient-to-r from-green-500 to-green-700"
                      : "bg-gray-100"
                  }`}
                />
                <p
                  className={`text-xs mt-1 font-medium text-center ${
                    stage.completed ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  {stage.name}
                </p>
              </div>

              {/* Connector Line */}
              {index < mobileStages.length - 1 && (
                <div
                  className={`w-4 h-px mx-1 ${
                    stage.completed ? "bg-green-300" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBanner;
