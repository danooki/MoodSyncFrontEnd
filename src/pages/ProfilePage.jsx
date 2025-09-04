import { useAuth } from "../hooks/useAuth.jsx";
import UserProfile from "../components/Features/UserProfile.jsx";

const ProfilePage = () => {
  const { user } = useAuth();

  return <UserProfile user={user} />;
};

export default ProfilePage;
