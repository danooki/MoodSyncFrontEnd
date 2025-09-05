// Simple component for displaying label and value pairs in profile sections
const ProfileField = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <p className="text-gray-900">{value}</p>
    </div>
  );
};

export default ProfileField;
