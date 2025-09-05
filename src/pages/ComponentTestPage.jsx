import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/UI";
import AnswerOption from "../components/Cards/AnswerOption";
import CircleChoiceCard from "../components/Cards/CircleChoiceCard";
import CircleWaitingCard from "../components/Cards/CircleWaitingCard";
import CircleStatusCard from "../components/Cards/CircleStatusCard";

const ComponentTestPage = () => {
  const navigate = useNavigate();

  // Mock data for testing components
  const mockQuestion = {
    id: 1,
    question: "How are you feeling today?",
    options: [
      { label: "Great! I'm feeling energetic and positive", value: 4 },
      { label: "Good, I'm in a stable mood", value: 3 },
      { label: "Okay, but feeling a bit low", value: 2 },
      { label: "Not great, struggling today", value: 1 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Components</h1>
          <p className="text-gray-600">
            Test all button variants and card components
          </p>
          <Button
            onClick={() => navigate("/login")}
            variant="secondary"
            className="mt-4"
          >
            ← Back to Login
          </Button>
        </div>

        {/* Button Variants Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Button Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Primary</h3>
              <Button variant="primary">Primary Button</Button>
              <Button variant="primary" loading>
                Loading
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Secondary</h3>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="secondary" loading>
                Loading
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Success</h3>
              <Button variant="success">Success Button</Button>
              <Button variant="success" loading>
                Loading
              </Button>
              <Button variant="success" disabled>
                Disabled
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Danger</h3>
              <Button variant="danger">Danger Button</Button>
              <Button variant="danger" loading>
                Loading
              </Button>
              <Button variant="danger" disabled>
                Disabled
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Info</h3>
              <Button variant="info">Info Button</Button>
              <Button variant="info" loading>
                Loading
              </Button>
              <Button variant="info" disabled>
                Disabled
              </Button>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Message</h3>
              <Button variant="message">Message Button</Button>
              <Button variant="message" loading>
                Loading
              </Button>
              <Button variant="message" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-3">Button Sizes</h3>
            <div className="flex items-center space-x-4">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-3">Full Width</h3>
            <Button variant="secondary" fullWidth>
              Full Width Button
            </Button>
          </div>
        </Card>

        {/* Card Components Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Card Components
          </h2>

          <div className="space-y-8">
            {/* Answer Options */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Answer Options (Question Buttons)
              </h3>
              <div className="space-y-3 max-w-md">
                {mockQuestion.options.map((option, index) => (
                  <AnswerOption
                    key={index}
                    option={option}
                    index={index}
                    isSubmitting={false}
                    onAnswerSubmit={() => console.log("Answer:", option.value)}
                  />
                ))}
              </div>
            </div>

            {/* Circle Cards */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Circle Cards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CircleChoiceCard
                  onWaitingForInvite={() => console.log("Waiting for invite")}
                  onCreateCircle={() => console.log("Create circle")}
                />
                <CircleWaitingCard
                  onChangeMind={() => console.log("Change mind")}
                />
                <CircleStatusCard
                  showRetryButton={true}
                  retryButtonText="Try Again"
                  onCreateCircle={() => console.log("Create circle")}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Color Palette Section */}
        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Button Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-800 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Primary</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Secondary</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Danger</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-white to-pink-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
              <p className="text-sm text-gray-600">Info</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-white to-yellow-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
              <p className="text-sm text-gray-600">Message</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentTestPage;
