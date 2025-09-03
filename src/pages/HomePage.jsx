import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useCircleManagement } from "../hooks/useCircleManagement.js";
import { useInvitationManagement } from "../hooks/useInvitationManagement.js";
import { useDailyScore } from "../hooks/useDailyScore.js";
import Navbar from "../components/Navigation/Navbar.jsx";
import CircleStatusCard from "../components/Features/CircleStatusCard.jsx";
import CircleInvitations from "../components/Features/CircleInvitations.jsx";

import InviteFriendModal from "../components/Modals/InviteFriendModal.jsx";

const HomePage = () => {
  const { user, fetchUserProfile, logout } = useAuth();
  const navigate = useNavigate();

  // Custom hooks for different concerns
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

  const {
    showInviteModal,
    inviteDisplayName,
    setInviteDisplayName,
    isInviting,
    inviteSuccess,
    circleInvitations,
    isLoadingInvitations,
    handleInviteFriend,
    handleAcceptInvite,
    handleDeclineInvite,
    handleInviteFriendClick,
    handleCloseInviteModal,
    fetchCircleInvitationsData,
  } = useInvitationManagement(
    circleStatus,
    checkCircleStatus,
    fetchUserProfile
  );

  const {
    dailyScore,
    isLoadingDailyScore,
    checkDailyScore,
    hasAnsweredAllQuestions,
  } = useDailyScore();

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
          <CircleStatusCard
            circleStatus={circleStatus}
            isLoading={isLoadingCircle}
            error={circleError}
            onCreateCircle={checkCircleStatus}
            onInviteFriend={handleInviteFriendClick}
            onStartQuestions={handleStartQuestions}
            hasAnsweredAllQuestions={hasAnsweredAllQuestions}
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
        </div>
      </div>

      {/* Invite Friend Modal */}
      <InviteFriendModal
        isOpen={showInviteModal}
        onClose={handleCloseInviteModal}
        onSubmit={handleInviteFriend}
        displayName={inviteDisplayName}
        setDisplayName={setInviteDisplayName}
        success={inviteSuccess}
        isInviting={isInviting}
      />
    </>
  );
};

export default HomePage;
