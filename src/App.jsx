import { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";
import CourseContent from "./pages/CourseContent";
import LandingPage from "./pages/LandingPage";
import AllCourses from "./pages/AllCourses";
import ScrollToTop from "./components/ScrollToTop";
import Signup from "./pages/Signup";

const App = () => {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("access_token") !== null
  );

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route
            path="/courses/:courseTitleSlug/:courseId/video/:videoId"
            element={<CourseContent />}
          />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 Page - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
