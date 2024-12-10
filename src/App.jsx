import { useEffect } from "react";
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
import Settings from "./pages/Settings";
import MyCourses from "./pages/MyCourses";
import CourseContent from "./pages/CourseContent";


const App = () => {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/:courseName/" element={<CourseDetails />} />
          <Route path="/:courseName/:videoId" element={<CourseDetails />} />
          <Route path="/courses/:courseName" element={<CourseContent />} /> */}
          <Route
            path="/courses/:courseTitleSlug/:courseId/video/:videoId"
            // path="/courses/:courseTitleSlug/video/:videoId"
            element={<CourseContent />}
          />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
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
