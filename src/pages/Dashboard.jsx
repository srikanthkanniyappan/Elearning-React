import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Manage your courses and profile easily. Explore and achieve your
          learning goals!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          onClick={() => handleNavigation("/my-courses")}
          className="cursor-pointer w-full p-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-center font-bold text-xl transition-all duration-300 ease-in-out flex flex-col justify-center items-center shadow-lg transform hover:scale-105"
        >
          <h4 className="leading-9">Go to My Courses</h4>
          <p className="text-sm mt-2">
            Access and manage all the courses you're enrolled in.
          </p>
        </div>
        <div
          onClick={() => handleNavigation("/profile")}
          className="cursor-pointer w-full p-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-center font-bold text-xl transition-all duration-300 ease-in-out flex flex-col justify-center items-center shadow-lg transform hover:scale-105"
        >
          <h4 className="leading-9">Go to Profile</h4>
          <p className="text-sm mt-2">
            View and edit your profile information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
