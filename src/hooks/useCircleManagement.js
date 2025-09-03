import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";
import { BASE_URL } from "../config/api.js";

export const useCircleManagement = () => {
  const { logout, fetchUserProfile } = useAuth();
  const navigate = useNavigate();
  const [circleName, setCircleName] = useState("");
  const [isCreatingCircle, setIsCreatingCircle] = useState(false);
  const [error, setError] = useState("");
  const [circleStatus, setCircleStatus] = useState(null);
  const [isLoadingCircle, setIsLoadingCircle] = useState(true);
  const [circleError, setCircleError] = useState("");

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

  return {
    circleName,
    setCircleName,
    isCreatingCircle,
    error,
    circleStatus,
    isLoadingCircle,
    circleError,
    checkCircleStatus,
    handleCreateCircle,
  };
};
