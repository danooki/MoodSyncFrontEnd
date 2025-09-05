// Generic section wrapper for profile information display with title and content
const ProfileWrapper = ({ title, children, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border-b border-gray-200 pb-3">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default ProfileWrapper;
