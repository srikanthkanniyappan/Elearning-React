import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/course.services";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.getCourses();
        setCourses(response);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = async (courseTitle, courseId) => {
    try {
      // Fetch last watched video for the course
      const lastWatchedResponse = await api.getLastWatched(courseId);
      const lastWatchedVideoId = lastWatchedResponse.last_watched_video;

      // Convert course title to slug format
      const courseTitleSlug = courseTitle.replace(/\s+/g, "-").toLowerCase();

      // Navigate to the course content page with the last watched video ID and courseId in state
      navigate(
        `/courses/${courseTitleSlug}/${courseId}/video/${lastWatchedVideoId}`
      );
      // navigate(`/courses/${courseTitleSlug}/video/${lastWatchedVideoId}`);
    } catch (error) {
      console.error("Error fetching last watched video:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-800 dark:text-white mb-8">
        Your Courses
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl">
        {courses.map((course) => (
          <div
            key={course.id}
            className="transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleCourseClick(course.title, course.id)}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <img
                src={course.poster}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>
                <span className="text-blue-600 dark:text-blue-400">
                  Learn More →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
