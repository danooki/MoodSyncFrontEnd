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

const EditProfileModal = ({
  isOpen,
  onClose,
  onSave,
  user,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    // Basic validation
    const newErrors = {};
    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSave(formData);
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setErrors({ general: error.message || "Failed to update profile" });
    }
  };

  const handleClose = () => {
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
    });
    setErrors({});
    setSuccess("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="✏️ Edit Profile"
      size="lg"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {success && <SuccessMessage message={success} />}
        {errors.general && <ErrorMessage message={errors.general} />}

        <div className="space-y-4">
          <Input
            label="Display Name"
            type="text"
            value={formData.displayName}
            onChange={(e) => handleInputChange("displayName", e.target.value)}
            error={errors.displayName}
            placeholder="Enter your display name"
            disabled={isLoading}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
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
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
