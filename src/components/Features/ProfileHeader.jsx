// Gradient header component for profile pages with avatar and welcome message
const ProfileHeader = ({ title = "User Profile", subtitle = "Welcome to MoodSync", userInitial = "U" }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
          {userInitial}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-indigo-100">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
