import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { BASE_URL } from "../config/api.js";
import MatchMemberCard from "../components/Cards/MatchMemberCard.jsx";
import {
  Button,
  Card,
  PageHeader,
  LoadingPage,
  ErrorPage,
} from "../components/UI";
import {
  getApiErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";

const MatchPreviewPage = () => {
  const { user } = useAuth();
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

  const handleBackToTrackingBoard = () => {
    navigate("/tracking-board");
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleViewProposals = () => {
    navigate("/proposals");
  };

  if (isLoading) {
    return <LoadingPage text="Loading match preview..." />;
  }

  if (error) {
    return (
      <ErrorPage
        error={error}
        onRetry={fetchMatchPreview}
        onBack={handleBackToTrackingBoard}
        backText="Back to Tracking Board"
      />
    );
  }

  if (!matchPreview || !matchPreview.allCompleted) {
    return (
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
    );
  }

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Match Preview"
        subtitle="Discover your circle's daily DISC personality traits and compatibility"
      />

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
            onClick={handleViewProposals}
            variant="success"
            size="lg"
            icon=""
          >
            View Evening Proposals
          </Button>
        </div>
        <div className="space-x-4">
          <Button
            onClick={handleBackToTrackingBoard}
            variant="secondary"
            icon="←"
          >
            Back to Tracking Board
          </Button>
          <Button onClick={handleBackToHome} variant="secondary">
            Back to Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default MatchPreviewPage;
