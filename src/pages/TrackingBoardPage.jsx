import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { BASE_URL } from "../config/api.js";
// components
import {
  Button,
  Card,
  PageHeader,
  LoadingPage,
  ErrorPage,
} from "../components/UI";
import Avatar from "../components/UI/Avatar.jsx";
import {
  getApiErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";

const TrackingBoardPage = () => {
  const { user } = useAuth();
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
    return <LoadingPage text="Loading tracking board..." />;
  }

  if (error) {
    return (
      <ErrorPage
        error={error}
        onRetry={fetchTrackingBoard}
        onBack={handleBackToHome}
        backText="Back to Home"
      />
    );
  }

  return (
    <>
      {/* Header */}
      <PageHeader
        title="📊 Tracking Board"
        subtitle="See how your circle is doing with daily mood assessments"
      />

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
                {trackingBoard.allCompleted ? "All Completed" : "In Progress"}
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
                  <Avatar
                    src={member.avatar}
                    alt={member.displayName}
                    displayName={member.displayName}
                    size="md"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {member.displayName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {member.answeredCount}/
                      {trackingBoard?.totalQuestions || 4} questions answered
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
    </>
  );
};

export default TrackingBoardPage;
