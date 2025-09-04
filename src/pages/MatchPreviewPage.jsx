import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { BASE_URL } from "../config/api.js";
import Navbar from "../components/Navigation/Navbar.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import MatchMemberCard from "../components/Cards/MatchMemberCard.jsx";
import { Button, Card } from "../components/UI";
import {
  getApiErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";

const MatchPreviewPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [matchPreview, setMatchPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMatchPreview();
  }, []);

  const fetchMatchPreview = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${BASE_URL}/match/preview`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMatchPreview(data);
      } else {
        const data = await response.json();
        if (response.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        setError(getApiErrorMessage(data, "Failed to fetch match preview"));
      }
    } catch (error) {
      console.error("Error fetching match preview:", error);
      setError(getNetworkErrorMessage());
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleBackToTrackingBoard = () => {
    navigate("/tracking-board");
  };

  const handleBackToHome = () => {
    navigate("/home");
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
                <Button onClick={fetchMatchPreview} variant="primary">
                  Try Again
                </Button>
                <Button onClick={handleBackToTrackingBoard} variant="secondary">
                  Back to Tracking Board
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  if (!matchPreview || !matchPreview.allCompleted) {
    return (
      <>
        <Navbar onLogout={handleLogout} user={user} />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <h2 className="text-2xl font-semibold text-yellow-600 mb-4">
                Not Ready Yet
              </h2>
              <p className="text-gray-600 mb-6">
                All circle members need to complete their daily questions before
                viewing the match preview.
              </p>
              <Button onClick={handleBackToTrackingBoard} variant="primary">
                Back to Tracking Board
              </Button>
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
              🎯 Match Preview
            </h1>
            <p className="text-xl text-gray-600">
              Discover your circle's daily DISC personality traits and
              compatibility
            </p>
          </div>

          {/* Circle Members with DISC Traits */}
          <div className="space-y-6">
            {matchPreview.circleMembers.map((member) => (
              <MatchMemberCard
                key={member._id}
                member={member}
                isSinglePersonCircle={matchPreview.isSinglePersonCircle}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12 space-y-4">
            <div className="space-x-4">
              <Button
                onClick={handleBackToTrackingBoard}
                variant="primary"
                icon="←"
              >
                Back to Tracking Board
              </Button>
              <Button onClick={handleBackToHome} variant="secondary">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchPreviewPage;
