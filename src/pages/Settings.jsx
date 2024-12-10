// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import authServices from '../services/auth.services'; // Import auth services

const Settings = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await authServices.getUserProfile();
        setUserProfile(profileData);
        setEmail(profileData.email);
      } catch (error) {
        setError('An error occurred while fetching user profile.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const updatedData = {
        email,
        password,
      };

      // Call an API to update the user profile
      await authServices.updateUserStatus(updatedData); // Assuming this API updates the profile (email/password)
      setSuccessMessage('Settings updated successfully');
      setError(null);
    } catch (error) {
      setError('An error occurred while updating your settings.');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-xl text-blue-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Settings</h1>
          <p className="text-md text-gray-600">Manage your account settings here.</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-600 p-4 rounded-lg mb-4">
            <p>{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 mt-1"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 mt-1"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-lg font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
