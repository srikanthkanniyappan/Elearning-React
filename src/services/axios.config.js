import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for adding Authorization token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling token expiration and refreshing
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh_token");
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      console.log("Access Token Expired..");
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${BASE_URL}/authentication/login/refresh/`,
          {
            refresh: refreshToken,
          }
        );
        const { access } = response.data;
        localStorage.setItem("access_token", access);
        axios.defaults.headers["Authorization"] = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
