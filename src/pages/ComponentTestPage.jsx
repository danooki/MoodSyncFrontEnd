import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../components/UI";
import BackgroundWrapper from "../components/UI/BackgroundWrapper";
import Modal from "../components/UI/Modal";
import AnswerOption from "../components/Cards/AnswerOption";
import CircleChoiceCard from "../components/Cards/CircleChoiceCard";
import CircleWaitingCard from "../components/Cards/CircleWaitingCard";
import CircleStatusCard from "../components/Cards/CircleStatusCard";
import Navbar from "../components/Navigation/Navbar";
import {
  CircleIcon,
  PlusIcon,
  SuccessIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
} from "../components/UI/Icons";

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

  // Mock user data for navbar
  const mockUser = {
    displayName: "Test User",
    email: "test@example.com",
    avatar: null,
    circle: {
      name: "Test Circle",
    },
  };

  // Mock logout function
  const handleLogout = () => {
    console.log("Logout clicked");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={mockUser} onLogout={handleLogout} />
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Components
            </h1>
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

            {/* Button Color Palette - moved closer to buttons */}
            <div className="mt-8">
              <h3 className="font-medium text-gray-700 mb-4">
                Button Color Palette
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Primary</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Secondary</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Danger</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-white to-pink-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                  <p className="text-sm text-gray-600">Info</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-white to-gray-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                  <p className="text-sm text-gray-600">Message</p>
                </div>
              </div>
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
                      onAnswerSubmit={() =>
                        console.log("Answer:", option.value)
                      }
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

          {/* Icons Section */}
          <Card className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Icons</h2>
            <p className="text-gray-600 mb-6">
              All available icons from the Icons component:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <CircleIcon />
                <p className="text-sm text-gray-600 mt-2">CircleIcon</p>
              </div>
              <div className="text-center">
                <PlusIcon />
                <p className="text-sm text-gray-600 mt-2">PlusIcon</p>
              </div>
              <div className="text-center">
                <SuccessIcon />
                <p className="text-sm text-gray-600 mt-2">SuccessIcon</p>
              </div>
              <div className="text-center">
                <InfoIcon />
                <p className="text-sm text-gray-600 mt-2">InfoIcon</p>
              </div>
              <div className="text-center">
                <WarningIcon />
                <p className="text-sm text-gray-600 mt-2">WarningIcon</p>
              </div>
              <div className="text-center">
                <ErrorIcon />
                <p className="text-sm text-gray-600 mt-2">ErrorIcon</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Icon Variants (Different Sizes)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">
                    Small (w-12 h-12)
                  </h4>
                  <div className="flex justify-center space-x-4">
                    <CircleIcon className="w-12 h-12" />
                    <PlusIcon className="w-12 h-12" />
                    <SuccessIcon className="w-12 h-12" />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">
                    Default (w-20 h-20)
                  </h4>
                  <div className="flex justify-center space-x-4">
                    <InfoIcon />
                    <WarningIcon />
                    <ErrorIcon />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">
                    Large (w-24 h-24)
                  </h4>
                  <div className="flex justify-center space-x-4">
                    <CircleIcon className="w-24 h-24" />
                    <PlusIcon className="w-24 h-24" />
                    <SuccessIcon className="w-24 h-24" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Background Gradients Section */}
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Background Gradients
            </h2>
            <p className="text-gray-600 mb-6">
              The BackgroundWrapper component randomly selects from these
              gradient combinations:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-50 to-teal-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Violet to Teal</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-indigo-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Green to Indigo</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-purple-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Orange to Purple</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-50 to-emerald-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Rose to Emerald</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-violet-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Amber to Violet</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-50 to-pink-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Cyan to Pink</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-orange-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Indigo to Orange</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-rose-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Teal to Rose</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-amber-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Purple to Amber</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-indigo-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Emerald to Indigo</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-50 to-teal-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Pink to Teal</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-orange-100 rounded-lg mx-auto mb-2 border border-gray-200"></div>
                <p className="text-xs text-gray-600">Blue to Orange</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Each time the BackgroundWrapper component
                is rendered, it randomly selects one of these gradients for a
                fresh, dynamic look.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComponentTestPage;
