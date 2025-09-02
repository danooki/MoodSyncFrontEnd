import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import FindYourMood from "./components/FindYourMood";
import ProfileLayout from "./components/ProfileLayout";
import ErrorHandler from "./components/ErrorHandler.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/home" replace />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/find-your-mood" element={<FindYourMood />} />
          <Route path="/profile" element={<ProfileLayout />} />
        </Route>

        {/* Catch-all route for invalid paths */}
        <Route path="*" element={<ErrorHandler />} />
      </Route>
    </Routes>
  );
};

export default App;
