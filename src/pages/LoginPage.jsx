import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useErrorHandler } from "../hooks/useErrorHandler.js";
import { Button, Input, Card } from "../components/UI";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError, clearError, startOperation, finishOperation } =
    useErrorHandler();

  const handleSubmit = async (e) => {
    e.preventDefault();
    startOperation();
    setIsLoading(true);

    const result = await login(formData);

    if (result.success) {
      navigate("/home");
    } else {
      showError(result.message);
    }

    finishOperation();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your MoodSync account</p>
        </div>

        <Card className="p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
