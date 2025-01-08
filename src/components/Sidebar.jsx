import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/course.services";

const Sidebar = () => {
  const { courseTitleSlug, courseId, videoId } = useParams();
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseVideos = async () => {
      try {
        const response = await api.getCourseVideos(courseId);
        setVideos(response);
      } catch (error) {
        console.error("Error fetching course videos:", error);
      }
    };
    fetchCourseVideos();
  }, [courseId]);

  const handleVideoClick = (newvideoId) => {
    if (videoId !== newvideoId) {
      navigate(`/courses/${courseTitleSlug}/${courseId}/video/${newvideoId}`);
      saveLastWached(newvideoId);
    }
  };
  const saveLastWached = async (newvideoId) => {
    try {
      await api.updateLastWatched(courseId, newvideoId);
    } catch (error) {
      console.error("Error updating last watched video:", error);
    }
  };
  return (
    <aside
      id="default-sidebar"
      className="sticky top-0 h-screen lg:border-l border-gray-300 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 lg:py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {videos.map((video) => (
            <li key={video.id}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                onClick={() => handleVideoClick(video.id)}
              >
                <img
                  src={video.poster_url}
                  alt={video.title}
                  className="w-16 h-10 rounded-lg mr-2 object-cover"
                />
                <span className="flex-1 text-sm font-semibold">
                  {video.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
