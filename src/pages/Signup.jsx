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
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Basic email format validation
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    const validationErrors = validateInputs();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return; // Stop execution if validation fails
    }

    setLoading(true);

    try {
      // Call the register method from authService
      await authService.register(username, email, password, role);

      // Redirect to dashboard after successful registration
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
          {/* Display Errors */}
          {errors.length > 0 && (
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
                onChange={() => setRole("student")}
              />
              <input
                type="radio"
                name="radio"
                id="teacher"
                className="hidden peer/teacher"
                checked={role === "teacher"}
                onChange={() => setRole("teacher")}
              />
              <input
                type="radio"
                name="radio"
                id="admin"
                className="hidden peer/admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
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
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-4 text-sm ${
                loading
                  ? "bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800"
                  : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
