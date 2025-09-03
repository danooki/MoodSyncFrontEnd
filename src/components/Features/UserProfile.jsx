import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Input from "../UI/Input";
import SectionHeader from "../UI/SectionHeader";
import {
  FormSection,
  FormRow,
  FormActions,
  SuccessMessage,
  ErrorMessage,
} from "../UI/Form";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    email: user.email || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const { updateProfile } = useAuth();

  const handleSave = async () => {
    setIsLoading(true);
    setMessage("");

    const result = await updateProfile(editForm);

    if (result.success) {
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } else {
      setMessage(result.message);
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setEditForm({
      email: user.email || "",
    });
    setIsEditing(false);
    setMessage("");
  };

  const isSuccessMessage = message.includes("successfully");

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
              U
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Profile</h1>
              <p className="text-indigo-100">Welcome to MoodSync</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {message &&
            (isSuccessMessage ? (
              <SuccessMessage message={message} className="mb-6" />
            ) : (
              <ErrorMessage message={message} className="mb-6" />
            ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <FormSection title="Personal Information">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />

                  <FormActions>
                    <Button
                      onClick={handleSave}
                      loading={isLoading}
                      disabled={isLoading}
                      variant="primary"
                      className="flex-1"
                    >
                      Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="secondary"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </FormActions>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Email
                    </span>
                    <p className="text-gray-900">{user.email}</p>
                  </div>

                  <Button onClick={() => setIsEditing(true)} variant="primary">
                    Edit Profile
                  </Button>
                </div>
              )}
            </FormSection>

            {/* Circle Information */}
            <FormSection title="Circle Information">
              <div className="space-y-4">
                {user.circle ? (
                  <>
                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Circle Name
                      </span>
                      <p className="text-gray-900">{user.circle.name}</p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Circle ID
                      </span>
                      <p className="text-gray-900 font-mono text-sm">
                        {user.circle.id}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Role
                      </span>
                      <p className="text-gray-900">
                        {user.circle.isOwner ? "Owner" : "Member"}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Members
                      </span>
                      <p className="text-gray-900">{user.circle.memberCount}</p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-500">
                        Circle Created
                      </span>
                      <p className="text-gray-900">
                        {new Date(user.circle.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </>
                ) : (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Circle Membership
                    </span>
                    <p className="text-gray-900 text-amber-600">
                      Not currently part of any circle
                    </p>
                  </div>
                )}
              </div>
            </FormSection>

            {/* Account Information */}
            <FormSection title="Account Information">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    User ID
                  </span>
                  <p className="text-gray-900 font-mono text-sm">
                    {user.id || "N/A"}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Member Since
                  </span>
                  <p className="text-gray-900">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Last Updated
                  </span>
                  <p className="text-gray-900">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </FormSection>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
