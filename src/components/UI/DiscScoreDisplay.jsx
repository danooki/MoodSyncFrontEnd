const DiscScoreDisplay = ({ dailyScore }) => {
  if (!dailyScore) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Your Today's Scores
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-red-600 font-bold text-lg">D</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{dailyScore.D}</p>
          <p className="text-sm text-gray-600">Dominance</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-yellow-600 font-bold text-lg">i</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{dailyScore.i}</p>
          <p className="text-sm text-gray-600">Influence</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-green-600 font-bold text-lg">S</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{dailyScore.S}</p>
          <p className="text-sm text-gray-600">Steadiness</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <span className="text-blue-600 font-bold text-lg">C</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{dailyScore.C}</p>
          <p className="text-sm text-gray-600">Conscientiousness</p>
        </div>
      </div>
      {dailyScore.dailyDominantTrait && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Your dominant trait today:{" "}
            <span className="font-semibold text-indigo-600">
              {dailyScore.dailyDominantTrait}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscScoreDisplay;
