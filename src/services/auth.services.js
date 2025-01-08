// auth.services.js
import api from "./axios.config";

const login = async (identifier, password, role) => {
  try {
    const response = await api.post("/authentication/login/", {
      username: identifier, // Use "username" key for both username and email
      password,
      role, // Include role in the login request
    });

    // Store tokens in localStorage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

const register = async (username, email, password, role) => {
  try {
    const response = await api.post("/authentication/register/", {
      username,
      email,
      password,
      role,
    });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await api.post("/authentication/login/refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem("access_token", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed", error);
    throw error;
  }
};

const getUserProfile = async () => {
  try {
    const response = await api.get("/authentication/user/profile/");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile", error);
    throw error;
  }
};

const updateUserStatus = async (status) => {
  try {
    const response = await api.post("/authentication/user/status-update/", {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user status", error);
    throw error;
  }
};

const checkUserOnlineStatus = async () => {
  try {
    const response = await api.get("/authentication/user/check-online/");
    return response.data;
  } catch (error) {
    console.error("Error checking user online status", error);
    throw error;
  }
};

export default {
  login,
  register,
  refreshAccessToken,
  getUserProfile,
  updateUserStatus,
  checkUserOnlineStatus,
};
