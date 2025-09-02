import React, { useState, useEffect } from "react";
import { BASE_URL } from "../config/api.js";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/user/me`, {
        credentials: "include", // This is crucial for sending cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // Backend returns { message, user, circle, dailyQuestions }
        // We need to merge circle data into the user object for the frontend
        const userWithCircle = {
          ...userData.user,
          circle: userData.circle, // Include circle information
        };
        setUser(userWithCircle);
      } else {
        // If the request fails, user is not authenticated
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is already logged in on app load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        credentials: "include", // This is crucial for receiving cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Backend returns user data and sets HTTP-only cookie
        // After login, fetch the complete user profile including circle data
        await fetchUserProfile();
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        credentials: "include", // This is crucial for receiving cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          displayName: userData.displayName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Backend returns user data
        // After registration, fetch the complete user profile including circle data
        await fetchUserProfile();
        return { success: true, user: data };
      } else {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    try {
      // Call the backend logout endpoint to clear the cookie
      await fetch(`${BASE_URL}/auth/signout`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear local state regardless of backend response
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${BASE_URL}/user/me`, {
        method: "PUT",
        credentials: "include", // This is crucial for sending cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        // Preserve circle information when updating profile
        const updatedUser = { ...user, ...profileData, circle: user.circle };
        setUser(updatedUser);
        return { success: true, user: updatedUser };
      } else {
        const data = await response.json();
        return {
          success: false,
          message: data.message || "Failed to update profile",
        };
      }
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    fetchUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
