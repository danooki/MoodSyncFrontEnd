import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import LoadingSpinner from "../components/UI/LoadingSpinner.jsx";
import BackgroundWrapper from "../components/UI/BackgroundWrapper.jsx";

const ProtectedLayout = () => {
  const { user, isLoading } = useAuth();

  // Auth loading state
  if (isLoading) {
    return (
      <BackgroundWrapper variant="centered">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Loading..." />
        </div>
      </BackgroundWrapper>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <BackgroundWrapper variant="padded">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </BackgroundWrapper>
  );
};

export default ProtectedLayout;
