import AnswerOption from "./AnswerOption";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";

const QuestionCard = ({ question, isSubmitting, onAnswerSubmit }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {question?.question || "Question"}
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the option that best describes how you feel today:
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {question?.options?.map((option, index) => (
            <AnswerOption
              key={index}
              option={option}
              index={index}
              isSubmitting={isSubmitting}
              onAnswerSubmit={onAnswerSubmit}
            />
          ))}
        </div>

        {isSubmitting && (
          <div className="mt-6 text-center">
            <LoadingSpinner />
            <p className="text-gray-600 mt-2">Submitting your answer...</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuestionCard;
