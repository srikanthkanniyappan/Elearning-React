import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import courseService from "../services/course.services";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 pt-24 h-full">
      <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-white mb-6">
        Explore Our Courses
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
        Find a course that fits your learning goals. From programming to data
        science, we have something for everyone.
      </p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl mx-auto mb-10">
        {courses.map((course) => (
          <Link
            to="/signup"
            key={course.id}
            className="transform transition duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col h-full">
              <img
                src={course.poster_url}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col justify-between p-6 flex-grow">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {course.description}
                  </p>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium mt-auto">
                  Learn More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
