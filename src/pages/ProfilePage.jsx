import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLogout } from "../hooks/useLogout.js";
import Navbar from "../components/Navigation/Navbar.jsx";
import UserProfile from "../components/Features/UserProfile.jsx";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  return (
    <>
      <Navbar onLogout={handleLogout} user={user} />
      <main className="container mx-auto px-4 py-8">
        <UserProfile user={user} />
      </main>
    </>
  );
};

export default ProfilePage;
