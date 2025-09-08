import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { Button, Input, Card, ErrorMessage } from "../components/UI";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(formData);

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MoodSync WebApp
          </h1>
          <p className="text-gray-600">
            Sign in to sync your Mood and find a common evening plan
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
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
                  className="font-medium text-indigo-600 hover:text-indigo-700"
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
