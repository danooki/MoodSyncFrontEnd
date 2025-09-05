import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/api.js";
import {
  getApiErrorMessage,
  getNetworkErrorMessage,
} from "../utils/errorUtils.js";

/**
 * Hook for fetching and managing proposals data
 * Follows the simple state management pattern from design principles
 */
const useProposals = () => {
  const [proposals, setProposals] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProposals = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`${BASE_URL}/hard-proposals/today`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProposals(data);
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        setError(
          getApiErrorMessage(
            errorData,
            `Failed to fetch proposals (${response.status})`
          )
        );
      }
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setError(getNetworkErrorMessage());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return {
    proposals,
    isLoading,
    error,
    refetch: fetchProposals,
  };
};

export default useProposals;
