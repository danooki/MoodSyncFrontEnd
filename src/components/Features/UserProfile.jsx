import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useCircleManagement } from "../../hooks/useCircleManagement.js";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { SuccessMessage, ErrorMessage } from "../UI";
import ProfileHeader from "./ProfileHeader";
import ProfileWrapper from "./ProfileWrapper";
import ProfileField from "./ProfileField";
import ProfileEditableField from "./ProfileEditableField";

const UserProfile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const { updateProfile } = useAuth();
  const {
    handleLeaveCircle,
    isLeavingCircle,
    error: circleError,
    message: circleMessage,
  } = useCircleManagement();

  const handleConfirmLeave = async () => {
    await handleLeaveCircle();
    setShowLeaveConfirmation(false);
  };

  const handleCancelLeave = () => {
    setShowLeaveConfirmation(false);
  };

  const isSuccessMessage =
    message.includes("successfully") || circleMessage.includes("successfully");
  const displayMessage = circleMessage || message;
  const displayError = circleError;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        <ProfileHeader userInitial="U" />

        {/* Profile Content */}
        <div className="p-6">
          {displayMessage &&
            (isSuccessMessage ? (
              <SuccessMessage message={displayMessage} className="mb-6" />
            ) : (
              <ErrorMessage message={displayMessage} className="mb-6" />
            ))}
          {displayError && (
            <ErrorMessage message={displayError} className="mb-6" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileWrapper title="Personal Information">
              <ProfileEditableField
                label="Email"
                value={user.email}
                type="email"
                onSave={async (newValue) => {
                  setIsLoading(true);
                  setMessage("");
                  const result = await updateProfile({ email: newValue });
                  if (result.success) {
                    setMessage("Profile updated successfully!");
                  } else {
                    setMessage(result.message);
                  }
                  setIsLoading(false);
                  return result;
                }}
                onCancel={() => setMessage("")}
                isLoading={isLoading}
              />
            </ProfileWrapper>

            <ProfileWrapper title="Account Information">
              <ProfileField
                label="User ID"
                value={user.id || "N/A"}
                className="font-mono text-sm"
              />
              <ProfileField
                label="Member Since"
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"
                }
              />
              <ProfileField
                label="Last Updated"
                value={
                  user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"
                }
              />
            </ProfileWrapper>

            <ProfileWrapper title="Circle Information">
              {user.circle ? (
                <>
                  <ProfileField label="Circle Name" value={user.circle.name} />
                  <ProfileField
                    label="Circle ID"
                    value={user.circle.id}
                    className="font-mono text-sm"
                  />
                  <ProfileField
                    label="Role"
                    value={user.circle.isOwner ? "Owner" : "Member"}
                  />
                  <ProfileField
                    label="Members"
                    value={user.circle.memberCount}
                  />
                  <ProfileField
                    label="Circle Created"
                    value={new Date(user.circle.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  />

                  {/* Leave Circle Section */}
                  <div className="pt-4 border-t border-gray-200">
                    {!showLeaveConfirmation ? (
                      <Button
                        onClick={() => setShowLeaveConfirmation(true)}
                        variant="danger"
                        className="w-full"
                      >
                        Leave Circle
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          {user.circle.isOwner
                            ? "You are the owner. Leaving will transfer ownership to another member."
                            : "Are you sure you want to leave this circle?"}
                        </p>
                        <div className="flex space-x-3">
                          <Button
                            onClick={handleConfirmLeave}
                            loading={isLeavingCircle}
                            variant="danger"
                            className="flex-1"
                          >
                            Confirm Leave Circle
                          </Button>
                          <Button
                            onClick={handleCancelLeave}
                            variant="secondary"
                            className="flex-1"
                            disabled={isLeavingCircle}
                            loading={false}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <ProfileField
                  label="Circle Membership"
                  value="Not currently part of any circle"
                  className="text-amber-600"
                />
              )}
            </ProfileWrapper>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
