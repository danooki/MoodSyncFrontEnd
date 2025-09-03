import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import { useErrorHandler } from "./useErrorHandler.js";
import { BASE_URL } from "../config/api.js";

export const useInvitationManagement = (
  circleStatus,
  checkCircleStatus,
  fetchUserProfile
) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    handleApiError,
    startOperation,
    finishOperation,
    showError,
    clearError,
  } = useErrorHandler();

  // Circle invitation states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteDisplayName, setInviteDisplayName] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState("");

  // Circle invitations states
  const [circleInvitations, setCircleInvitations] = useState([]);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);

  // Fetch pending circle invitations
  const fetchCircleInvitationsData = async () => {
    try {
      startOperation();
      setIsLoadingInvitations(true);
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

        // Use centralized error handling
        handleApiError(new Error(data.message), {
          status: response.status,
          data,
        });
      }
    } catch (error) {
      console.error("Error fetching circle invitations:", error);

      // Set empty array on error to avoid showing loading state indefinitely
      setCircleInvitations([]);

      // Use centralized error handling
      handleApiError(error);
    } finally {
      finishOperation();
      setIsLoadingInvitations(false);
    }
  };

  // Handle circle invitation
  const handleInviteFriend = async (e) => {
    e.preventDefault();
    if (!inviteDisplayName.trim()) {
      showError("Display name is required");
      return;
    }

    setIsInviting(true);
    clearError();
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

        // Use centralized error handling with custom messages
        const customMessages = {
          400: data.message || "Failed to send invitation",
          403:
            data.message ||
            "You don't have permission to invite users to this circle.",
          404: "Friend's display name not found or does not exist. Please check the display name and try again.",
          500: "Server error. Please try again later.",
        };

        handleApiError(
          new Error(data.message),
          { status: response.status, data },
          customMessages
        );
      }
    } catch (err) {
      console.error("Invitation error:", err);
      handleApiError(err);
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
        await fetchCircleInvitationsData();
        await fetchUserProfile();
      } else {
        const data = await response.json();

        // Use centralized error handling
        const customMessages = {
          400: data.message || "Failed to accept invitation",
          403:
            data.message ||
            "You don't have permission to accept this invitation.",
          404: "Invitation not found.",
          500: "Server error. Please try again later.",
        };

        const errorMessage = handleApiError(
          new Error(data.message),
          { status: response.status, data },
          customMessages
        );
        console.error("Accept invitation error:", errorMessage);
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      handleApiError(error);
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
        await fetchCircleInvitationsData();
      } else {
        const data = await response.json();

        // Use centralized error handling
        const customMessages = {
          400: data.message || "Failed to decline invitation",
          403:
            data.message ||
            "You don't have permission to decline this invitation.",
          404: "Invitation not found.",
          500: "Server error. Please try again later.",
        };

        const errorMessage = handleApiError(
          new Error(data.message),
          { status: response.status, data },
          customMessages
        );
        console.error("Decline invitation error:", errorMessage);
      }
    } catch (error) {
      console.error("Error declining invitation:", error);
      handleApiError(error);
    }
  };

  const handleInviteFriendClick = () => {
    setShowInviteModal(true);
  };

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
    clearError();
    setInviteSuccess("");
    setInviteDisplayName("");
  };

  return {
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
  };
};
