import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import Card from "../UI/Card";
import { SuccessMessage, ErrorMessage } from "../UI";
import ProfileHeader from "./ProfileHeader";
import ProfileWrapper from "./ProfileWrapper";
import ProfileField from "./ProfileField";
import ProfileEditableField from "./ProfileEditableField";

const UserProfile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { updateProfile } = useAuth();

  const isSuccessMessage = message.includes("successfully");

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        <ProfileHeader userInitial="U" />

        {/* Profile Content */}
        <div className="p-6">
          {message &&
            (isSuccessMessage ? (
              <SuccessMessage message={message} className="mb-6" />
            ) : (
              <ErrorMessage message={message} className="mb-6" />
            ))}

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
                </>
              ) : (
                <ProfileField
                  label="Circle Membership"
                  value="Not currently part of any circle"
                  className="text-amber-600"
                />
              )}
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
