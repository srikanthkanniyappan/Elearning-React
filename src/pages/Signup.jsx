import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.services";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comingSoon, setComingSoon] = useState(false); 
  const [disabled, setDisabled] = useState(false); 

  const navigate = useNavigate();

  const validateInputs = () => {
    const validationErrors = [];

    // Validate username
    if (!username) {
      validationErrors.push("Username is required.");
    } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(username)) {
      validationErrors.push(
        "Username can only contain letters, numbers, and underscores, and cannot start with a number."
      );
    } else if (username.includes("@")) {
      validationErrors.push("Username cannot contain '@'.");
    } else if (username.length < 4) {
      validationErrors.push("Username must be at least 4 characters long.");
    }

    // Validate email
    if (!email) {
      validationErrors.push("Email is required.");
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) 
    ) {
      validationErrors.push("Email format is invalid.");
    }

    // Validate password
    if (!password) {
      validationErrors.push("Password is required.");
    } else if (password.length < 8) {
      validationErrors.push("Password must be at least 8 characters long.");
    } else if (!/[A-Z]/.test(password)) {
      validationErrors.push(
        "Password must contain at least one uppercase letter."
      );
    } else if (!/[a-z]/.test(password)) {
      validationErrors.push(
        "Password must contain at least one lowercase letter."
      );
    } else if (!/\d/.test(password)) {
      validationErrors.push("Password must contain at least one number.");
    } else if (!/[!@#$%^&*]/.test(password)) {
      validationErrors.push(
        "Password must contain at least one special character (!@#$%^&*)."
      );
    }

    return validationErrors;
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === "teacher" || newRole === "admin") {
      setComingSoon(true);
      setDisabled(true);
    } else {
      setComingSoon(false);
      setDisabled(false); 
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors([]); 

    if (role === "teacher" || role === "admin") {
      return;
    }

    const validationErrors = validateInputs();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return; 
    }

    setLoading(true);

    try {
      await authService.register(username, email, password, role);

      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response && err.response.data && err.response.data.error) {
        setErrors([err.response.data.error]);
      } else {
        setErrors(["Signup failed. Please check your inputs and try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 pt-20">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Signup
          </h2>

          {/* Show Coming Soon Message if Role is Teacher or Admin */}
          {comingSoon && (
            <div className="text-yellow-500 text-center mb-4">
              This feature is coming soon for Teacher and Admin roles.
            </div>
          )}

          {/* Display Errors */}
          {errors.length > 0 && !comingSoon && (
            <div className="text-red-500 text-center mb-4">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSignup}>
            {/* Role Tabs */}
            <div className="relative flex items-center justify-center w-full mb-6">
              <input
                type="radio"
                name="radio"
                id="student"
                className="hidden peer/student"
                checked={role === "student"}
                onChange={() => handleRoleChange("student")}
              />
              <input
                type="radio"
                name="radio"
                id="teacher"
                className="hidden peer/teacher"
                checked={role === "teacher"}
                onChange={() => handleRoleChange("teacher")}
              />
              <input
                type="radio"
                name="radio"
                id="admin"
                className="hidden peer/admin"
                checked={role === "admin"}
                onChange={() => handleRoleChange("admin")}
              />

              <label
                htmlFor="student"
                className="peer-checked/student:text-white peer-checked/student:z-10 peer-checked/student:border-none flex items-center justify-center w-1/3 h-10 font-medium text-gray-800 transition duration-300 ease-in-out border-2 border-gray-200 rounded-l-md cursor-pointer"
              >
                Student
              </label>
              <label
                htmlFor="teacher"
                className="peer-checked/teacher:text-white peer-checked/teacher:z-10 peer-checked/teacher:border-none flex items-center justify-center w-1/3 h-10 font-medium text-gray-800 transition duration-300 ease-in-out border-y-2 border-gray-200 cursor-pointer"
              >
                Teacher
              </label>
              <label
                htmlFor="admin"
                className="peer-checked/admin:text-white peer-checked/admin:z-10 peer-checked/admin:border-none flex items-center justify-center w-1/3 h-10 font-medium text-gray-800 transition duration-300 ease-in-out border-2 border-gray-200 rounded-r-md cursor-pointer"
              >
                Admin
              </label>

              <span className="absolute top-0 left-0 w-1/3 h-full rounded-md bg-gradient-to-r from-blue-500 to-blue-700 opacity-90 transition-all duration-500 ease-out peer-checked/student:left-0 peer-checked/teacher:left-1/3 peer-checked/admin:left-2/3"></span>
            </div>

            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus:ring-blue-500"
                required
                disabled={disabled}
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus:ring-blue-500"
                required
                disabled={disabled}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus:ring-blue-500"
                required
                disabled={disabled}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || disabled}
              className={`w-full text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-4 text-sm ${
                loading
                  ? "bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800"
                  : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 100 101"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Signing up...
                </div>
              ) : (
                "Signup"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
