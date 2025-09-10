import { Link } from "react-router-dom";

// Simple footer component with left text and About us link
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center text-sm text-gray-600">
        <div>Berlin, September 2025</div>
        <div className="flex space-x-6">
          <Link
            to="/about"
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            About
          </Link>
          <Link
            to="/development"
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            Development
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
