import React from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { SuccessMessage, ErrorMessage } from "../UI";

const InviteFriendModal = ({
  isOpen,
  onClose,
  onSubmit,
  displayName,
  setDisplayName,
  success,
  error,
  isInviting,
}) => {
  console.log("InviteFriendModal props:", { success, error, isInviting });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite a Friend" size="md">
      <div className="space-y-6">
        <p className="text-gray-600">
          Enter your friend's display name to send them a circle invitation.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your friend's or partner's user name..."
            disabled={isInviting}
            required
          />

          {success && <SuccessMessage message={success} />}
          {error && <ErrorMessage message={error} />}

          <div className="flex space-x-3">
            <Button
              type="submit"
              loading={isInviting}
              disabled={isInviting}
              variant="primary"
              className="flex-1"
            >
              {isInviting ? "Sending..." : "Send Invitation"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>

        {/* Help text for common issues */}
        <div className="pt-4 border-t border-gray-200">
          <ul className="text-xs text-gray-500 space-y-1">
            <li>
              • Remember: People can only belong to 1 circle (for now ...)
            </li>

            <li>
              • Make sure the display name is exactly as your friend registered
            </li>
            <li>
              • Check that your friend hasn't already joined another circle
            </li>
            <li>• Ensure you have a stable internet connection</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default InviteFriendModal;
