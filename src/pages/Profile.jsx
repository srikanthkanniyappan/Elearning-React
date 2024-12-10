// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import authServices from '../services/auth.services'; // Import auth services

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile and online status when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileData = await authServices.getUserProfile();
        setUserProfile(profileData);

        // Fetch user online status
        const onlineStatus = await authServices.checkUserOnlineStatus();
        setIsOnline(onlineStatus.is_online);
      } catch (error) {
        setError('An error occurred while fetching data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-xl text-blue-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-600">
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Your Profile</h1>
          <p className="text-md text-gray-600">View and update your profile information here.</p>
        </div>

        {/* User Profile */}
        {userProfile && (
          <div className="flex justify-center items-center">
            <div className="w-full sm:w-3/4 md:w-1/2 bg-white rounded-lg shadow-md p-6 space-y-4">
              {/* Username */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 text-lg">Username:</span>
                <span className="text-gray-800">{userProfile.username}</span>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 text-lg">Email:</span>
                <span className="text-gray-800">{userProfile.email}</span>
              </div>

              {/* Role */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 text-lg">Role:</span>
                <span className="text-gray-800">{userProfile.role}</span>
              </div>

              {/* Online Status */}
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700 text-lg">Online Status:</span>
                <span
                  className={`py-1 px-3 rounded-full text-white ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
