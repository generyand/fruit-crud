import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-center h-screen text-red-500">
      {message}
    </div>
  );
}

export default ErrorMessage;