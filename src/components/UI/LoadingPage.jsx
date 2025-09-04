import React from "react";
import LoadingSpinner from "./LoadingSpinner";

// this component displays a loading spinner in the center of the page.
// it is used when a complete page is loading.
const LoadingPage = ({ text = "Loading...", size = "lg" }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <LoadingSpinner size={size} text={text} />
    </div>
  );
};

export default LoadingPage;
