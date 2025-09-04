import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import { BASE_URL } from "../config/api.js";

export const useInvitationManagement = (
  circleStatus,
  checkCircleStatus,
  fetchUserProfile
) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Circle invitation states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteDisplayName, setInviteDisplayName] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState("");
  const [inviteError, setInviteError] = useState("");

  // Circle invitations states
  const [circleInvitations, setCircleInvitations] = useState([]);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(false);
  const [invitationsError, setInvitationsError] = useState("");

  // Fetch pending circle invitations
  const fetchCircleInvitationsData = async () => {
    try {
      setInvitationsError("");
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
        setInvitationsError(data.message || "Failed to load invitations");
      }
    } catch (error) {
      console.error("Error fetching circle invitations:", error);

      // Set empty array on error to avoid showing loading state indefinitely
      setCircleInvitations([]);
      setInvitationsError("Network error. Please try again.");
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

        // Simple error handling based on status
        if (response.status === 404) {
          setInviteError(
            "Friend's display name not found. Please check the name and try again."
          );
        } else if (response.status === 403) {
          setInviteError(
            "You don't have permission to invite users to this circle."
          );
        } else {
          setInviteError(data.message || "Failed to send invitation");
        }
      }
    } catch (err) {
      console.error("Invitation error:", err);
      setInviteError("Network error. Please try again.");
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
        console.error("Accept invitation error:", data.message);
        setInvitationsError(data.message || "Failed to accept invitation");
      }
    } catch (error) {
      console.error("Error accepting invitation:", error);
      setInvitationsError("Network error. Please try again.");
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
        console.error("Decline invitation error:", data.message);
        setInvitationsError(data.message || "Failed to decline invitation");
      }
    } catch (error) {
      console.error("Error declining invitation:", error);
      setInvitationsError("Network error. Please try again.");
    }
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

  return {
    showInviteModal,
    inviteDisplayName,
    setInviteDisplayName,
    isInviting,
    inviteSuccess,
    inviteError,
    circleInvitations,
    isLoadingInvitations,
    invitationsError,
    handleInviteFriend,
    handleAcceptInvite,
    handleDeclineInvite,
    handleInviteFriendClick,
    handleCloseInviteModal,
    fetchCircleInvitationsData,
  };
};
