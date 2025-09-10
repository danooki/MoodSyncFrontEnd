import { useNavigate } from "react-router-dom";

// Navbar component for non-authenticated users (public pages)
const OffNavBar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };


  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-800 transition-colors"
                onClick={handleLogoClick}
              >
                MoodSync
              </h1>
            </div>
          </div>

          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLoginClick}
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OffNavBar;
