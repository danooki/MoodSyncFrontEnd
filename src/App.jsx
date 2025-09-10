import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

import QuestionInterfacePage from "./pages/QuestionInterfacePage";
import TrackingBoardPage from "./pages/TrackingBoardPage";
import ProposalsPage from "./pages/ProposalsPage";
import MatchPreviewPage from "./pages/MatchPreviewPage";
import ProfilePage from "./pages/ProfilePage";
import ComponentTestPage from "./pages/ComponentTestPage";
import AboutPage from "./pages/AboutPage";
import DevelopmentPage from "./pages/DevelopmentPage";
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  return (
    <Routes>
      {/* Components Page - completely independent, no layout */}
      <Route path="/components" element={<ComponentTestPage />} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/home" />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Public routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/development" element={<DevelopmentPage />} />

        {/* Protected routes - all nested under ProtectedLayout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<HomePage />} />

          <Route path="/questions" element={<QuestionInterfacePage />} />
          <Route path="/tracking-board" element={<TrackingBoardPage />} />
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/match-preview" element={<MatchPreviewPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all route for invalid paths - smart redirect based on auth status */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
