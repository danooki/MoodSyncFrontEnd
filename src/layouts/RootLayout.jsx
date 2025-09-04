import { Outlet } from "react-router-dom";
import BackgroundWrapper from "../components/UI/BackgroundWrapper.jsx";

const RootLayout = () => {
  return (
    <BackgroundWrapper>
      <Outlet />
    </BackgroundWrapper>
  );
};

export default RootLayout;
