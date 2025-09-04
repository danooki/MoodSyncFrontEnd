import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";

/**
 * Custom hook for handling logout functionality
 * Eliminates duplication of logout logic across pages
 */
export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return { handleLogout };
};
