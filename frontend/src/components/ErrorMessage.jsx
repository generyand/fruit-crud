import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="p-4 text-red-700 bg-red-100 rounded dark:bg-red-900 dark:text-red-100">
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;