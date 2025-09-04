import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { BASE_URL } from "../config/api.js";
import Navbar from "../components/Navigation/Navbar.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import { Button, Card } from "../components/UI";
import {
  getApiErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";

const TrackingBoardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [trackingBoard, setTrackingBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrackingBoard();
  }, []);

  const fetchTrackingBoard = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${BASE_URL}/tracking-board`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Handle different possible response structures
        if (data.trackingBoard) {
          // console.log("Using data.trackingBoard:", data.trackingBoard);
          setTrackingBoard(data.trackingBoard);
        } else if (data.circleId) {
          // Direct response structure
          setTrackingBoard(data);
        } else {
          console.error("Unexpected response structure:", data);
          setError("Unexpected response format from server");
        }
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        setError(
          getApiErrorMessage(
            errorData,
            `Failed to fetch tracking board (${response.status})`
          )
        );
      }
    } catch (error) {
      console.error("Error fetching tracking board:", error);
      setError(getNetworkErrorMessage());
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleViewMatchPreview = () => {
    navigate("/match-preview");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Completed":
        return "Completed";
      case "Pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar onLogout={handleLogout} user={user} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar onLogout={handleLogout} user={user} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                Error
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="space-x-4">
                <Button onClick={fetchTrackingBoard} variant="primary">
                  Try Again
                </Button>
                <Button onClick={handleBackToHome} variant="secondary">
                  Back to Home
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar onLogout={handleLogout} user={user} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📊 Tracking Board
            </h1>
            <p className="text-xl text-gray-600">
              See how your circle is doing with daily mood assessments
            </p>
          </div>

          {/* Circle Info */}
          {trackingBoard && (
            <Card className="mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {trackingBoard.circleName}
                </h2>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-gray-600">
                    {trackingBoard.members.length} members
                  </span>
                  <span className="text-gray-600">•</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      trackingBoard.allCompleted
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {trackingBoard.allCompleted
                      ? "All Completed"
                      : "In Progress"}
                  </span>
                </div>
              </div>

              {/* Members List */}
              <div className="space-y-4">
                {trackingBoard.members.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.displayName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-indigo-600 font-semibold">
                            {member.displayName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {member.displayName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {member.answeredCount}/
                          {trackingBoard?.totalQuestions || 4} questions
                          answered
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          member.status
                        )}`}
                      >
                        {getStatusText(member.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            {trackingBoard && trackingBoard.allCompleted && (
              <Button
                onClick={handleViewMatchPreview}
                variant="success"
                size="lg"
                icon="🎯"
              >
                View Match Preview
              </Button>
            )}
            <div>
              <Button onClick={handleBackToHome} variant="primary" icon="←">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingBoardPage;
