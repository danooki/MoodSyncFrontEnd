const DiscInfoCards = () => {
  const discTypes = [
    {
      letter: "D",
      name: "Dominance",
      description: "Direct, decisive, and results-oriented",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      letter: "i",
      name: "Influence",
      description: "Optimistic, social, and people-oriented",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      letter: "S",
      name: "Steadiness",
      description: "Patient, loyal, and team-oriented",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      letter: "C",
      name: "Conscientiousness",
      description: "Analytical, precise, and quality-oriented",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {discTypes.map((type) => (
        <div
          key={type.letter}
          className="bg-white rounded-xl shadow-lg p-6 text-center"
        >
          <div
            className={`w-12 h-12 ${type.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}
          >
            <span className={`${type.textColor} font-bold text-lg`}>
              {type.letter}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {type.name}
          </h3>
          <p className="text-gray-600 text-sm">{type.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DiscInfoCards;
