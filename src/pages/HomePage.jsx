import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { BASE_URL } from "../config/api.js";
import Navbar from "../components/Navbar";
import CircleStatusCard from "../components/CircleStatusCard";
import CircleInvitations from "../components/CircleInvitations";
import QuickActions from "../components/QuickActions";
import InviteFriendModal from "../components/InviteFriendModal";

const HomePage = () => {
  const { user, fetchUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [circleName, setCircleName] = useState("");
  const [isCreatingCircle, setIsCreatingCircle] = useState(false);
  const [error, setError] = useState("");

  // Circle invitation states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteDisplayName, setInviteDisplayName] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Circle status states
  const [circleStatus, setCircleStatus] = useState(null);
  const [isLoadingCircle, setIsLoadingCircle] = useState(true);
  const [circleError, setCircleError] = useState("");

  // Circle invitations states
  const [circleInvitations, setCircleInvitations] = useState([]);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);
  const [invitationsError, setInvitationsError] = useState("");

  // Check if user is in a circle
  const checkCircleStatus = async () => {
    try {
      setIsLoadingCircle(true);
      setCircleError("");
      const response = await fetch(`${BASE_URL}/circle/my-circle`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCircleStatus(data);
      } else {
        const data = await response.json();
        console.error("Circle status error:", data.message);

        if (response.status === 401) {
          // User is not authenticated, redirect to login
          logout();
          navigate("/login");
          return;
        }

        setCircleStatus(null);
        setCircleError(data.message || "Failed to load circle status");
      }
    } catch (error) {
      console.error("Error checking circle status:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setCircleError(
          "Network error: Unable to connect to server. Please check your internet connection."
        );
      } else {
        setCircleError("Failed to load circle status. Please try again.");
      }

      setCircleStatus(null);
    } finally {
      setIsLoadingCircle(false);
    }
  };

  // Fetch pending circle invitations
  const fetchCircleInvitations = async () => {
    try {
      setIsLoadingInvitations(true);
      setInvitationsError("");
      const response = await fetch(`${BASE_URL}/circle/invites`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCircleInvitations(data || []);
      } else {
        const data = await response.json();
        console.error("Fetch invitations error:", data.message);

        if (response.status === 401) {
          // User is not authenticated, redirect to login
          logout();
          navigate("/login");
          return;
        }

        // Set empty array on error to avoid showing loading state indefinitely
        setCircleInvitations([]);
        setInvitationsError(data.message || "Failed to load invitations");
      }
    } catch (error) {
      console.error("Error fetching circle invitations:", error);

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setInvitationsError(
          "Network error: Unable to connect to server. Please check your internet connection."
        );
      } else {
        setInvitationsError("Failed to load invitations. Please try again.");
      }

      // Set empty array on error to avoid showing loading state indefinitely
      setCircleInvitations([]);
    } finally {
      setIsLoadingInvitations(false);
    }
  };

  // Handle circle invitation
  const handleInviteFriend = async (e) => {
    e.preventDefault();
    if (!inviteDisplayName.trim()) {
      setInviteError("Display name is required");
      return;
    }

    setIsInviting(true);
    setInviteError("");
    setInviteSuccess("");

    try {
      const response = await fetch(
        `${BASE_URL}/circle/${circleStatus.circleId}/invite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ displayName: inviteDisplayName.trim() }),
        }
      );

      if (response.ok) {
        setInviteSuccess(`Invitation sent to ${inviteDisplayName}!`);
        setInviteDisplayName("");
        setTimeout(() => {
          setShowInviteModal(false);
          setInviteSuccess("");
        }, 2000);
      } else {
        const data = await response.json();
        let errorMessage = "Failed to send invitation";

        // Handle specific error cases based on backend response
        if (response.status === 400) {
          if (data.message?.includes("not found")) {
            errorMessage = `User "${inviteDisplayName}" not found. Please check the display name and try again.`;
          } else if (data.message?.includes("already in circle")) {
            errorMessage = `User "${inviteDisplayName}" is already in a circle and cannot be invited.`;
          } else if (data.message?.includes("already invited")) {
            errorMessage = `User "${inviteDisplayName}" has already been invited to this circle.`;
          } else if (data.message?.includes("Validation error")) {
            errorMessage = "Please enter a valid display name.";
          } else {
            errorMessage = data.message || errorMessage;
          }
        } else if (response.status === 403) {
          if (data.message?.includes("already in circle")) {
            errorMessage = `User "${inviteDisplayName}" is already in a circle and cannot be invited.`;
          } else if (data.message?.includes("already invited")) {
            errorMessage = `User "${inviteDisplayName}" has already been invited to this circle.`;
          } else {
            errorMessage =
              data.message ||
              "You don't have permission to invite users to this circle.";
          }
        } else if (response.status === 404) {
          errorMessage =
            "Friend's display name not found or does not exist. Please check the display name and try again.";
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = data.message || errorMessage;
        }

        setInviteError(errorMessage);
      }
    } catch (err) {
      console.error("Invitation error:", err);

      // Handle different types of network errors
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setInviteError(
          "Network error: Unable to connect to the server. Please check your internet connection and try again."
        );
      } else if (err.name === "AbortError") {
        setInviteError("Request was cancelled. Please try again.");
      } else {
        setInviteError(
          "Network error. Please check your connection and try again."
        );
      }
    } finally {
      setIsInviting(false);
    }
  };

  // Handle accepting invitation
  const handleAcceptInvite = async (inviteId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/circle/invite/${inviteId}/accept`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Refresh circle status and invitations
        await checkCircleStatus();
        await fetchCircleInvitations();
        await fetchUserProfile();
      } else {
        const data = await response.json();
        let errorMessage = "Failed to accept invitation";

        if (response.status === 400) {
          if (data.message?.includes("not found")) {
            errorMessage = "Invitation not found or has expired.";
          } else if (data.message?.includes("Validation error")) {
            errorMessage = "Invalid invitation data.";
          } else {
            errorMessage = data.message || errorMessage;
          }
        } else if (response.status === 403) {
          if (data.message?.includes("Not your invitation")) {
            errorMessage = "This invitation doesn't belong to you.";
          } else {
            errorMessage =
              data.message ||
              "You don't have permission to accept this invitation.";
          }
        } else if (response.status === 404) {
          errorMessage = "Invitation not found.";
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = data.message || errorMessage;
        }

        // Show error to user (you could add a toast notification here)
        console.error("Accept invitation error:", errorMessage);
        alert(`Error accepting invitation: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);

      let errorMessage = "Network error. Please try again.";
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage =
          "Network error: Unable to connect to the server. Please check your internet connection and try again.";
      }

      alert(`Error accepting invitation: ${errorMessage}`);
    }
  };

  // Handle declining invitation
  const handleDeclineInvite = async (inviteId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/circle/invite/${inviteId}/decline`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Refresh invitations
        await fetchCircleInvitations();
      } else {
        const data = await response.json();
        let errorMessage = "Failed to decline invitation";

        if (response.status === 400) {
          if (data.message?.includes("not found")) {
            errorMessage = "Invitation not found or has expired.";
          } else if (data.message?.includes("Validation error")) {
            errorMessage = "Invalid invitation data.";
          } else {
            errorMessage = data.message || errorMessage;
          }
        } else if (response.status === 403) {
          if (data.message?.includes("Not your invitation")) {
            errorMessage = "This invitation doesn't belong to you.";
          } else {
            errorMessage =
              data.message ||
              "You don't have permission to decline this invitation.";
          }
        } else if (response.status === 404) {
          errorMessage = "Invitation not found.";
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = data.message || errorMessage;
        }

        // Show error to user
        console.error("Decline invitation error:", errorMessage);
        alert(`Error declining invitation: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error declining invitation:", error);

      let errorMessage = "Network error. Please try again.";
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage =
          "Network error: Unable to connect to the server. Please check your internet connection and try again.";
      }

      alert(`Error declining invitation: ${errorMessage}`);
    }
  };

  // Load data on component mount
  useEffect(() => {
    checkCircleStatus();
    fetchCircleInvitations();
  }, []);

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
        // Refresh the user profile and circle status
        await fetchUserProfile();
        await checkCircleStatus();
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

  const handleInviteFriendClick = () => {
    setShowInviteModal(true);
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
    setInviteError("");
    setInviteSuccess("");
    setInviteDisplayName("");
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
            onFindYourMood={handleFindYourMood}
            circleName={circleName}
            setCircleName={setCircleName}
            isCreatingCircle={isCreatingCircle}
            createError={error}
          />

          {/* Pending Invitations */}
          <CircleInvitations
            invitations={circleInvitations}
            isLoading={isLoadingInvitations}
            error={invitationsError}
            onRefresh={fetchCircleInvitations}
            onAccept={handleAcceptInvite}
            onDecline={handleDeclineInvite}
          />

          {/* Quick Actions */}
          <QuickActions
            onProfile={handleProfile}
            onFindYourMood={handleFindYourMood}
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
        error={inviteError}
        success={inviteSuccess}
        isInviting={isInviting}
      />
    </>
  );
};

export default HomePage;
