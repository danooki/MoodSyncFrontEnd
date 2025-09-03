const AnswerOption = ({ option, index, isSubmitting, onAnswerSubmit }) => {
  const handleClick = () => {
    if (!isSubmitting) {
      onAnswerSubmit(option.value);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className="w-full p-6 text-left bg-gray-50 hover:bg-indigo-50 border-2 border-gray-200 hover:border-indigo-300 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-center">
        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold mr-4">
          {String.fromCharCode(65 + index)}
        </div>
        <div>
          <div className="font-medium text-gray-900">{option.label}</div>
          <div className="text-sm text-gray-600 mt-1">{option.description}</div>
        </div>
      </div>
    </button>
  );
};

export default AnswerOption;
