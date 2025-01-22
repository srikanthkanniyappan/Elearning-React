import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import courseService from "../services/course.services";
import Loader from "../components/Loader";
import ErrorPage from "./ErrorPage";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [loadingEnroll, setLoadingEnroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCoursesWithEnrollmentStatus();
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

  const handleEnrollNow = async () => {
    if (!selectedCourse) return;

    setLoadingEnroll(true);
    try {
      await courseService.enrollInCourse({ course_id: selectedCourse });
      setAlert({
        type: "success",
        message: "Successfully enrolled in the course!",
      });

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === selectedCourse
            ? { ...course, is_enrolled: true }
            : course
        )
      );

      setSelectedCourse(null);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to enroll. Please try again later.",
      });
      setSelectedCourse(null);
    } finally {
      setLoadingEnroll(false);
    }

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleCourseClick = async (courseTitle, courseId) => {
    setLoadingCourse(true);
    try {
      // Fetch last watched video for the course
      const lastWatchedResponse = await courseService.getLastWatched(courseId);
      const lastWatchedVideoId = lastWatchedResponse.last_watched_video;

      // Convert course title to slug format
      const courseTitleSlug = courseTitle.replace(/\s+/g, "-").toLowerCase();

      // Navigate to the course content page
      navigate(
        `/courses/${courseTitleSlug}/${courseId}/video/${lastWatchedVideoId}`
      );
    } catch (error) {
      console.error("Error fetching last watched video:", error);
    } finally {
      setLoadingCourse(false); // Hide loader after navigation
    }
  };

  if (loading || loadingCourse) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 pt-24 h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-white mb-6">
        Explore Our Courses
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
        Find a course that fits your learning goals. From programming to data
        science, we have something for everyone.
      </p>

      {/* Alert Section */}
      {alert && (
        <div
          className={`fixed bottom-3 right-0 z-50 flex items-center p-3 mb-4 text-sm rounded-lg w-3/4 sm:w-1/2 lg:w-1/3 ${
            alert.type === "success"
              ? "text-blue-800 bg-blue-100 dark:bg-gray-800 dark:text-blue-400 opacity-100"
              : "text-red-800 bg-red-100 dark:bg-gray-800 dark:text-red-400 opacity-100"
          }`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-xs sm:text-sm font-medium">
            {alert.message}
          </div>

          {/* Close Button */}
          <button
            onClick={() => setAlert(null)}
            className="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl mx-auto mb-10 bg-gray-100">
        {courses.map((course) => (
          <div
            key={course.id}
            className="cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => {
              if (course.is_enrolled) {
                handleCourseClick(course.title, course.id);
              } else {
                setSelectedCourse(course.id);
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 flex flex-col h-full">
              <img
                src={course.poster_url}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col justify-between items-center p-6 flex-grow">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {course.description}
                  </p>
                </div>
                {course.is_enrolled ? (
                  <span className="text-green-600 dark:text-green-400 font-medium mt-auto text-lg">
                    Enrolled
                  </span>
                ) : (
                  <button
                    className="text-white w-1/2 bg-blue-600 dark:bg-blue-800 font-medium px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCourse(course.id);
                    }}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-hidden">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Enrollment</h2>
            <p>Are you sure you want to enroll in this course?</p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded mr-4"
                onClick={() => setSelectedCourse(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEnrollNow}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Loader */}
      {loadingEnroll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-2xl">Enrolling...</div>
          <div className="spinner-border animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mt-4"></div>
        </div>
      )}
    </div>
  );
};

export default AllCourses;
