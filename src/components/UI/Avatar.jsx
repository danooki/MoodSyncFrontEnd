/**
 * Avatar component - displays user avatar image or initials with gradient background
 * Supports different sizes and consistent styling across the app
 */

const Avatar = ({ src, alt, displayName, size = "md", className = "" }) => {
  // Size configurations
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-16 h-16 text-2xl",
  };

  // Generate consistent gradient based on displayName
  const getGradientClass = (name) => {
    if (!name) return "bg-gradient-to-br from-indigo-400 to-purple-500";

    // Simple hash to get consistent color based on name
    // a hash is a number that is generated from a string
    const hash = name.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    const gradients = [
      "bg-gradient-to-br from-indigo-400 to-purple-500",
      "bg-gradient-to-br from-pink-400 to-rose-500",
      "bg-gradient-to-br from-blue-400 to-cyan-500",
      "bg-gradient-to-br from-green-400 to-emerald-500",
      "bg-gradient-to-br from-yellow-400 to-orange-500",
      "bg-gradient-to-br from-purple-400 to-indigo-500",
    ];

    // Math gets a random number to choose a gradient.
    return gradients[Math.abs(hash) % gradients.length];
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const gradientClass = getGradientClass(displayName);
  const initial = displayName ? displayName.charAt(0).toUpperCase() : "U";

  // if no avatar image, it shows initial displayName.
  return (
    <div
      className={`${sizeClass} ${gradientClass} rounded-full flex items-center justify-center text-white font-semibold ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || displayName || "User avatar"}
          className={`${sizeClass} rounded-full object-cover`}
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
};

export default Avatar;
