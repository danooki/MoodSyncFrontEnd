import React, { useState, useEffect, createContext } from "react";
import { BASE_URL } from "../config/api.js";
import {
  getLoginErrorMessage,
  getRegistrationErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get token from localStorage
  const getToken = () => {
    return localStorage.getItem("moodsync_token");
  };

  // Helper function to set token in localStorage
  const setToken = (token) => {
    localStorage.setItem("moodsync_token", token);
  };

  // Helper function to remove token from localStorage
  const removeToken = () => {
    localStorage.removeItem("moodsync_token");
  };

  const fetchUserProfile = async () => {
    const token = getToken();

    // If no token, user is not authenticated
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/user/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        // If the request fails, token might be invalid
        removeToken();
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      removeToken();
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        setToken(data.token);

        // Use the user data from login response directly
        const userWithCircle = {
          ...data.user,
          circle: data.circle, // Include circle information from login response
        };
        setUser(userWithCircle);
        return { success: true, user: userWithCircle };
      } else {
        // Use simplified error handling
        const errorMessage = getLoginErrorMessage(response, data);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: getNetworkErrorMessage() };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
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
        // Store token in localStorage
        setToken(data.token);

        // Backend returns user data
        // Don't fetch user profile immediately to allow success message to show
        return { success: true, user: data };
      } else {
        return {
          success: false,
          message: getRegistrationErrorMessage(data),
        };
      }
    } catch {
      return { success: false, message: getNetworkErrorMessage() };
    }
  };

  const logout = async () => {
    try {
      // Call the backend logout endpoint
      await fetch(`${BASE_URL}/auth/signout`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Remove token from localStorage and clear local state
      removeToken();
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    const token = getToken();

    if (!token) {
      return { success: false, message: "No authentication token found" };
    }

    try {
      const response = await fetch(`${BASE_URL}/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      return { success: false, message: getNetworkErrorMessage() };
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
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
