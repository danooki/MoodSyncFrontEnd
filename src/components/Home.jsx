import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { BASE_URL } from "../config/api.js";
import Navbar from "./Navbar";

const Home = () => {
  const { user, fetchUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [circleName, setCircleName] = useState("");
  const [isCreatingCircle, setIsCreatingCircle] = useState(false);
  const [error, setError] = useState("");

  const handleCreateCircle = async (e) => {
    e.preventDefault();
    if (!circleName.trim()) {
      setError("Circle name is required");
      return;
    }

    setIsCreatingCircle(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/circle`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ circleName: circleName.trim() }),
      });

      if (response.ok) {
        const newCircle = await response.json();
        // Refresh the user profile to get the updated circle information
        await fetchUserProfile();
        setCircleName("");
        setIsCreatingCircle(false);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create circle");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsCreatingCircle(false);
    }
  };

  const handleFindYourMood = () => {
    navigate("/find-your-mood");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} user={user} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.displayName}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Ready to sync your mood with your circle?
            </p>
          </div>

          {/* Circle Status Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              {user?.circle ? (
                <>
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Your Circle: {user.circle.name}
                    </h2>
                    <p className="text-gray-600">
                      You're all set! Ready to find your mood?
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handleFindYourMood}
                      className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                    >
                      🎯 Find Your Mood
                    </button>
                    <button
                      onClick={handleProfile}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      👤 View Profile
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      Create Your Circle
                    </h2>
                    <p className="text-gray-600">
                      Start your mood-syncing journey by creating a circle with
                      friends
                    </p>
                  </div>

                  <form onSubmit={handleCreateCircle} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={circleName}
                        onChange={(e) => setCircleName(e.target.value)}
                        placeholder="Enter your circle name..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        disabled={isCreatingCircle}
                      />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button
                      type="submit"
                      disabled={isCreatingCircle}
                      className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCreatingCircle ? "Creating..." : "✨ Create Circle"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Profile Settings
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Update your personal information, avatar, and preferences
              </p>
              <button
                onClick={handleProfile}
                className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-200 transition-colors"
              >
                Manage Profile
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Daily Scores
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Track your daily DISC scores and mood patterns
              </p>
              <button
                onClick={handleFindYourMood}
                className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors"
              >
                View Scores
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
