// DISC utility functions for trait display and styling
export const getTraitColor = (trait) => {
  switch (trait) {
    case "D":
      return "bg-red-100 text-red-800 border-red-200";
    case "i":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "S":
      return "bg-green-100 text-green-800 border-green-200";
    case "C":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
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
