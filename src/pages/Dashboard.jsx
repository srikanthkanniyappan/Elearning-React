// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Dashboard = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-md text-gray-600">Your personalized dashboard content goes here.</p>
        </div>

        {/* Navigation to Profile */}
        <div className="flex justify-center gap-4 mt-4">
          <Link
            to="/profile"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
