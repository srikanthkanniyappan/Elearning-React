import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/course.services";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.getCourses();
        setCourses(response);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = async (courseTitle, courseId) => {
    setLoadingCourse(true);
    try {
      const lastWatchedResponse = await api.getLastWatched(courseId);
      const lastWatchedVideoId = lastWatchedResponse.last_watched_video;

      // Convert course title to slug format
      const courseTitleSlug = courseTitle.replace(/\s+/g, "-").toLowerCase();

      // Navigate to the course content page with the last watched video ID and courseId in the URL
      navigate(
        `/courses/${courseTitleSlug}/${courseId}/video/${lastWatchedVideoId}`
      );
    } catch (error) {
      console.error("Error fetching last watched video:", error);
    } finally {
      setLoadingCourse(false);
    }
  };

  const handleEnrollClick = () => {
    navigate("/all-courses");
  };

  if (loading || loadingCourse) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 pt-24 h-screen">
      {courses.length > 0 && (
        <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-white mb-6">
          Your Courses
        </h1>
      )}
      {courses.length > 0 && (
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
          Explore the courses you are enrolled in. Continue your learning
          journey!
        </p>
      )}
      {courses.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            You are not enrolled in any courses yet.
          </p>
          <button
            onClick={handleEnrollClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Enroll in a Course Now
          </button>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl mx-auto mb-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="transform transition duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleCourseClick(course.title, course.id)}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
