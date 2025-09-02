import React from "react";

const InviteFriendModal = ({
  isOpen,
  onClose,
  onSubmit,
  displayName,
  setDisplayName,
  error,
  success,
  isInviting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          👥 Invite a Friend
        </h3>
        <p className="text-gray-600 mb-6">
          Enter your friend's display name to send them a circle invitation.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter display name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isInviting}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isInviting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isInviting ? "Sending..." : "Send Invitation"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Help text for common issues */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">💡 Tips:</p>
          <ul className="text-xs text-gray-500 space-y-1">
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
    </div>
  );
};

export default InviteFriendModal;
