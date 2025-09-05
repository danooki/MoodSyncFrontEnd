import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Avatar from "../UI/Avatar";

const Navbar = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Close profile menu when clicking outside - simple approach
  useEffect(() => {
    const handleClickOutside = () => {
      if (isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      // Add click listener to document when menu is open
      document.addEventListener("click", handleClickOutside);
    }

    // Cleanup: remove listener when component unmounts or menu closes
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  // Safety check - if user is not available, show minimal navbar
  if (!user || typeof user !== "object") {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-indigo-600 cursor-pointer">
                  MoodSync
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const handleProfileClick = () => {
    navigate("/profile");
    setIsProfileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
    setIsProfileMenuOpen(false);
  };

  // Handle profile button click - prevent outside click from closing menu immediately
  const handleProfileButtonClick = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to document
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-xl font-bold text-indigo-600 cursor-pointer"
                onClick={() => navigate("/home")}
              >
                MoodSync
              </h1>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info - Hidden on mobile, shown on larger screens */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName || user?.email || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.circle
                    ? `Member of ${user.circle.name}`
                    : "No circle membership"}
                </p>
              </div>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <Button
                onClick={handleProfileButtonClick}
                variant="message"
                className="relative flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2"
              >
                <Avatar
                  src={user?.avatar}
                  alt={user?.displayName || user?.email || "User"}
                  displayName={user?.displayName || user?.email || "User"}
                  size="sm"
                  className="hover:opacity-80 transition-opacity"
                />
                {user?.circle && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
                {/* Dropdown arrow */}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.displayName || user?.email || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.circle ? user.circle.name : "No circle"}
                    </p>
                  </div>

                  <Button
                    onClick={handleProfileClick}
                    variant="secondary"
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors justify-start"
                  >
                    👤 Profile Settings
                  </Button>

                  <Button
                    onClick={handleLogoutClick}
                    variant="danger"
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50 transition-colors justify-start"
                  >
                    🚪 Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
