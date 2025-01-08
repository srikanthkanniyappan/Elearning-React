import React, { useEffect, useState } from "react";
import authService from "../services/auth.services";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getUserProfile();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching profile data");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  const formattedRole =
    profile.role.charAt(0).toUpperCase() + profile.role.slice(1);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        {/* Profile Header */}
        <div className="flex justify-center mb-6">
          <img
            className="w-32 h-32 rounded-full border-4 border-blue-500"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
          />
        </div>

        {/* Profile Information */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          {profile.username}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          {formattedRole}
        </p>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {profile.email}
            </li>
          </ul>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleEditClick}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal: "Coming Soon" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Coming Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              We are working on this feature. Stay tuned!
            </p>
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
