import { Outlet } from "react-router-dom";
import GlobalErrorDisplay from "../components/UI/GlobalErrorDisplay.jsx";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <GlobalErrorDisplay />
      <Outlet />
    </div>
  );
};

export default RootLayout;
