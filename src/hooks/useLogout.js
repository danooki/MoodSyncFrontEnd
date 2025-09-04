import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.jsx";

// this hook handles logout functionality.
// it is to check if the user is logged in. If not, it will redirect to the login.
export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return { handleLogout };
};
