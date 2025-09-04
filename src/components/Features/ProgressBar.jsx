const ProgressBar = ({ progress, totalQuestions }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progress: {Math.round(progress)}%
        </span>
        <span className="text-sm text-gray-500">
          {Math.round((progress / 100) * totalQuestions)} of {totalQuestions}{" "}
          questions
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
