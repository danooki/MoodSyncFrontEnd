import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import BackgroundWrapper from "../components/UI/BackgroundWrapper.jsx";

const ProtectedLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <BackgroundWrapper variant="centered">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </BackgroundWrapper>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
