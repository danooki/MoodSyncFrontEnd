import { useAuth } from "../hooks/useAuth.jsx";
import { useLogout } from "../hooks/useLogout.js";
import { Navbar, OffNavBar } from "../components/Navigation/index.js";
import BackgroundWrapper from "../components/UI/BackgroundWrapper.jsx";
import { InfoIcon, SuccessIcon } from "../components/UI/Icons.jsx";

// Development page with technical details and developer information
const DevelopmentPage = () => {
  const { user } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <BackgroundWrapper>
      {/* Navbar for navigation */}
      {user ? <Navbar onLogout={handleLogout} user={user} /> : <OffNavBar />}

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Development
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the team and technical details of the MoodSync project.
            </p>
          </div>

          {/* Developer Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              The Hooman behind
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              {/* GitHub Avatar */}
              <div className="flex-shrink-0">
                <img
                  src="https://github.com/danooki.png"
                  alt="Daniel's GitHub Avatar"
                  className="w-32 h-32 rounded-full border-4 border-indigo-200 shadow-lg"
                />
              </div>

              {/* Developer Info */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Daniel
                </h3>
                <p className="text-gray-600 mb-4">
                  Full-stack developer passionate about creating meaningful
                  applications that bring people together. MoodSync was built to
                  help friends and partners better understand each other and
                  plan activities that everyone will enjoy.
                </p>
                <div className="flex justify-center md:justify-start">
                  <a
                    href="https://github.com/danooki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Project Repositories */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              GitHub Repositories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Frontend Repository */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <InfoIcon
                      className="w-12 h-12"
                      color="text-blue-600"
                      bgColor="bg-blue-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Frontend
                    </h3>
                    <p className="text-gray-600">React Application</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Modern React frontend built with Vite, featuring responsive
                  design, real-time updates, and intuitive user interface for
                  mood tracking and circle management.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    React
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    JavaScript
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Tailwind CSS
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Vite
                  </span>
                </div>
                <a
                  href="https://github.com/danooki/MoodSyncFrontEnd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View Repository
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Backend Repository */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <SuccessIcon
                      className="w-12 h-12"
                      color="text-green-600"
                      bgColor="bg-green-100"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Backend API
                    </h3>
                    <p className="text-gray-600">Node.js Server</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Robust Node.js backend with Express, MongoDB, and JWT
                  authentication. Handles user management, circle operations,
                  and mood assessment processing.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Node.js
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    Express
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    MongoDB
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    JWT
                  </span>
                </div>
                <a
                  href="https://github.com/danooki/MoodSyncAPI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View Repository
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default DevelopmentPage;
