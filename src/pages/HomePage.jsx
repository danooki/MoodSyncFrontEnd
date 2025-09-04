import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useCircleManagement } from "../hooks/useCircleManagement.js";
import { useDailyScore } from "../hooks/useDailyScore.js";
import { BASE_URL } from "../config/api.js";
import {
  getApiErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";
import CircleStatusCard from "../components/Cards/CircleStatusCard.jsx";
import CircleInvitations from "../components/Features/CircleInvitations.jsx";
import InviteFriendModal from "../components/Modals/InviteFriendModal.jsx";
import { PageHeader } from "../components/UI";

const HomePage = () => {
  const { user, fetchUserProfile } = useAuth();
  const navigate = useNavigate();

  // Circle management hook
  const {
    circleName,
    setCircleName,
    isCreatingCircle,
    error,
    circleStatus,
    isLoadingCircle,
    circleError,
    checkCircleStatus,
    handleCreateCircle,
  } = useCircleManagement();

  // Daily score hook
  const {
    dailyScore,
    isLoadingDailyScore,
    checkDailyScore,
    hasAnsweredAllQuestions,
    dailyScoreDate,
  } = useDailyScore();

  // Simple invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteDisplayName, setInviteDisplayName] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");

  // Simple invitations state
  const [circleInvitations, setCircleInvitations] = useState([]);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);

  // Simple function to fetch invitations
  const fetchCircleInvitationsData = async () => {
    setIsLoadingInvitations(true);
    try {
      const response = await fetch(`${BASE_URL}/circle/invites`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setCircleInvitations(data || []);
      } else if (response.status === 401) {
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching invitations:", error);
    } finally {
      setIsLoadingInvitations(false);
    }
  };

  // Simple function to handle invite friend
  const handleInviteFriend = async (e) => {
    e.preventDefault();
    if (!inviteDisplayName.trim()) {
      setInviteError("Display name is required");
      return;
    }

    setIsInviting(true);
    setInviteError("");

    try {
      const response = await fetch(
        `${BASE_URL}/circle/${circleStatus.circleId}/invite`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayName: inviteDisplayName.trim() }),
        }
      );

      if (response.ok) {
        setInviteDisplayName("");
        setShowInviteModal(false);
      } else {
        const data = await response.json();
        setInviteError(getApiErrorMessage(data, "Failed to send invitation"));
      }
    } catch (error) {
      setInviteError(getNetworkErrorMessage());
    } finally {
      setIsInviting(false);
    }
  };

  // Simple function to accept invitation
  const handleAcceptInvite = async (inviteId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/circle/invite/${inviteId}/accept`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        await checkCircleStatus();
        await fetchCircleInvitationsData();
        await fetchUserProfile();
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  // Simple function to decline invitation
  const handleDeclineInvite = async (inviteId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/circle/invite/${inviteId}/decline`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        await fetchCircleInvitationsData();
      }
    } catch (error) {
      console.error("Error declining invitation:", error);
    }
  };

  // Simple modal handlers
  const handleInviteFriendClick = () => setShowInviteModal(true);
  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
    setInviteError("");
    setInviteDisplayName("");
  };

  // Load data on component mount
  useEffect(() => {
    checkCircleStatus();
    fetchCircleInvitationsData();
    checkDailyScore();
  }, []);

  const handleStartQuestions = () => {
    // Check if all questions are already answered
    if (hasAnsweredAllQuestions) {
      // If all questions answered, go to tracking board instead
      navigate("/tracking-board");
    } else {
      // If questions not answered, go to questions page
      navigate("/questions");
    }
  };


  return (
    <>
      {/* Welcome Header */}
      <PageHeader
        title={`Welcome back, ${user?.displayName}! 👋`}
        subtitle="Ready to sync your mood with your circle?"
      />

      {/* Circle Status Card */}
      <CircleStatusCard
        user={user}
        circleStatus={circleStatus}
        isLoading={isLoadingCircle}
        error={circleError}
        onCreateCircle={handleCreateCircle}
        onInviteFriend={handleInviteFriendClick}
        onStartQuestions={handleStartQuestions}
        hasAnsweredAllQuestions={hasAnsweredAllQuestions}
        dailyScoreDate={dailyScoreDate}
        circleName={circleName}
        setCircleName={setCircleName}
        isCreatingCircle={isCreatingCircle}
      />

      {/* Pending Invitations */}
      <CircleInvitations
        invitations={circleInvitations}
        isLoading={isLoadingInvitations}
        onRefresh={fetchCircleInvitationsData}
        onAccept={handleAcceptInvite}
        onDecline={handleDeclineInvite}
      />

      {/* Invite Friend Modal */}
      <InviteFriendModal
        isOpen={showInviteModal}
        onClose={handleCloseInviteModal}
        onSubmit={handleInviteFriend}
        displayName={inviteDisplayName}
        setDisplayName={setInviteDisplayName}
        error={inviteError}
        isInviting={isInviting}
      />
    </>
  );
};

export default HomePage;
