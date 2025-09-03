import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { Button, Input, Card, ErrorMessage } from "../components/UI";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.displayName.length < 3) {
      setError("Display name must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    const result = await register({
      displayName: formData.displayName,
      email: formData.email,
      password: formData.password,
    });

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
            Create Account
          </h1>
          <p className="text-gray-600">Join MoodSync today</p>
        </div>

        <Card className="p-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}

            <Input
              id="displayName"
              name="displayName"
              type="text"
              label="Display Name"
              autoComplete="username"
              required
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Choose a display name"
            />
            <p className="mt-1 text-xs text-gray-500">
              This will be your public name in the app
            </p>

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
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters long
            </p>

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />

            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
