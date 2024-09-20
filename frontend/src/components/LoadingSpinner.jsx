import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
      <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}

export default LoadingSpinner;
