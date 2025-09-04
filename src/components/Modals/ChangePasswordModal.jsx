import React, { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Input from "../UI/Input";
// Simple inline message components
const SuccessMessage = ({ message, className = "" }) => (
  <div
    className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}
  >
    <p className="text-green-600 text-sm">{message}</p>
  </div>
);

const ErrorMessage = ({ message, className = "" }) => (
  <div
    className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}
  >
    <p className="text-red-600 text-sm">{message}</p>
  </div>
);

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onChangePassword,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onChangePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setSuccess("Password changed successfully!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      setErrors({ general: error.message || "Failed to change password" });
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setSuccess("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="🔐 Change Password"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {success && <SuccessMessage message={success} />}
        {errors.general && <ErrorMessage message={errors.general} />}

        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={formData.currentPassword}
            onChange={(e) =>
              handleInputChange("currentPassword", e.target.value)
            }
            error={errors.currentPassword}
            placeholder="Enter your current password"
            disabled={isLoading}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            error={errors.newPassword}
            placeholder="Enter your new password"
            disabled={isLoading}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            error={errors.confirmPassword}
            placeholder="Confirm your new password"
            disabled={isLoading}
            required
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-4">
            💡 Password requirements:
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Use a combination of letters, numbers, and symbols</li>
            <li>• Avoid common passwords</li>
          </ul>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            onClick={handleClose}
            variant="secondary"
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            loading={isLoading}
            disabled={isLoading}
          >
            Change Password
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
