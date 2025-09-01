import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout, user }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-indigo-600">MoodSync</h1>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info - Hidden on mobile, shown on larger screens */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-gray-500">
                  {user.circle
                    ? `Member of ${user.circle.name}`
                    : "No circle membership"}
                </p>
              </div>
              <div className="relative">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "U"}
                </div>
                {user.circle && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
            </div>

            {/* Mobile User Avatar */}
            <div className="sm:hidden">
              <div className="relative">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "U"}
                </div>
                {user.circle && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
              className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
