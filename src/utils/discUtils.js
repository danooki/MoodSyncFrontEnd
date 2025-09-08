
// DISC utility functions for trait display and styling
export const getTraitColor = (trait) => {
  switch (trait) {
    case "D":
      return "bg-red-500 text-white border-red-200";
    case "i":
      return "bg-yellow-500 text-white border-gray-200";
    case "S":
      return "bg-green-500 text-white border-green-200";
    case "C":
      return "bg-blue-500 text-white border-blue-200";
    default:
      return "bg-gray-500 text-white border-gray-200";
  }
};

export const getTraitGradient = (trait) => {
  switch (trait) {
    case "D":
      return "bg-gradient-to-br from-red-500 to-red-600";
    case "i":
      return "bg-gradient-to-br from-yellow-400 to-orange-500";
    case "S":
      return "bg-gradient-to-br from-green-500 to-emerald-600";
    case "C":
      return "bg-gradient-to-br from-blue-500 to-indigo-600";
    default:
      return "bg-gradient-to-br from-gray-500 to-gray-600";
  }
};

export const getTraitName = (trait) => {
  switch (trait) {
    case "D":
      return "Dominance";
    case "i":
      return "Influence";
    case "S":
      return "Steadiness";
    case "C":
      return "Conscientiousness";
    default:
      return "Unknown";
  }
};

export const getTraitDescription = (trait) => {
  switch (trait) {
    case "D":
      return "Direct, decisive, and results-oriented";
    case "i":
      return "Optimistic, social, and people-oriented";
    case "S":
      return "Patient, loyal, and team-oriented";
    case "C":
      return "Analytical, precise, and quality-oriented";
    default:
      return "";
  }
};
