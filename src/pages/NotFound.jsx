import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setRedirectTo("/dashboard");
    } else {
      setRedirectTo("/");
    }
  }, []);

  const handleRedirect = () => {
    navigate(redirectTo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={handleRedirect}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {redirectTo === "/dashboard" ? "Go to Dashboard" : "Go to Home"}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
