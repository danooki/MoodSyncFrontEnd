import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useLogout } from "../hooks/useLogout.js";
import { Navbar, OffNavBar } from "../components/Navigation/index.js";
import BackgroundWrapper from "../components/UI/BackgroundWrapper.jsx";
import Footer from "../components/UI/Footer.jsx";

const RootLayout = () => {
  const { user } = useAuth();
  const { handleLogout } = useLogout();
  const location = useLocation();

  // Don't show navbar on auth pages (login/register)
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar for navigation - not shown on auth pages */}
      {!isAuthPage &&
        (user ? <Navbar onLogout={handleLogout} user={user} /> : <OffNavBar />)}

      <BackgroundWrapper>
        <Outlet />
      </BackgroundWrapper>
      <Footer />
    </div>
  );
};

export default RootLayout;
