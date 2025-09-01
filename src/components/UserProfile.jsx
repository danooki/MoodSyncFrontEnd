import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
          {message && (
            <div
              className={`mb-6 p-4 rounded-md text-sm ${
                message.includes("successfully")
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Personal Information
              </h2>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Email
                    </span>
                    <p className="text-gray-900">{user.email}</p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* Circle Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Circle Information
              </h2>

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
            </div>

            {/* Account Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Account Information
              </h2>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
