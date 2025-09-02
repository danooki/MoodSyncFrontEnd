import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import Navbar from "../components/Navbar";

const FindYourMoodPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} user={user} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎯 Find Your Mood
            </h1>
            <p className="text-xl text-gray-600">
              Let's discover your DISC personality for today
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Coming Soon!
              </h2>
              <p className="text-gray-600 mb-6">
                The mood assessment feature is currently under development.
                You'll be able to answer daily questions and discover your DISC
                personality traits.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => navigate("/home")}
                  className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 font-bold text-lg">D</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dominance
              </h3>
              <p className="text-gray-600 text-sm">
                Direct, decisive, and results-oriented
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 font-bold text-lg">i</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Influence
              </h3>
              <p className="text-gray-600 text-sm">
                Optimistic, social, and people-oriented
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">S</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Steadiness
              </h3>
              <p className="text-gray-600 text-sm">
                Patient, loyal, and team-oriented
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">C</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Conscientiousness
              </h3>
              <p className="text-gray-600 text-sm">
                Analytical, precise, and quality-oriented
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindYourMoodPage;
