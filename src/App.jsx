import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import FindYourMoodPage from "./pages/FindYourMoodPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/home" replace />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected routes - all nested under ProtectedLayout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/find-your-mood" element={<FindYourMoodPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Catch-all route for invalid paths - smart redirect based on auth status */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
