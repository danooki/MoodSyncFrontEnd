import { Outlet } from "react-router-dom";
import BackgroundWrapper from "../components/UI/BackgroundWrapper.jsx";
import Footer from "../components/UI/Footer.jsx";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundWrapper>
        <Outlet />
      </BackgroundWrapper>
      <Footer />
    </div>
  );
};

export default RootLayout;
