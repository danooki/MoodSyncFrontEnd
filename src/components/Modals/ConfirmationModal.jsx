import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "⚠️ Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning", // warning, danger, info
  size = "md",
  isLoading = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "🗑️",
          confirmVariant: "danger",
          titleColor: "text-red-600",
        };
      case "warning":
        return {
          icon: "⚠️",
          confirmVariant: "warning",
          titleColor: "text-yellow-600",
        };
      case "info":
        return {
          icon: "ℹ️",
          confirmVariant: "primary",
          titleColor: "text-blue-600",
        };
      default:
        return {
          icon: "❓",
          confirmVariant: "primary",
          titleColor: "text-gray-600",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      showCloseButton={true}
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-4">{styles.icon}</div>
          <p className="text-gray-700 text-lg">{message}</p>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex-1"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={styles.confirmVariant}
            className="flex-1"
            loading={isLoading}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
