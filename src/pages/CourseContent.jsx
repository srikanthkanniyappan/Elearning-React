import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/course.services";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "../components/VideoPlayer";
import TabSection from "../components/TabSection";
import Loader from "../components/Loader";

const CourseContent = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { courseTitleSlug, courseId, videoId } = useParams();
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true);
      try {
        const response = await api.getVideo(videoId);
        setVideo(response);
      } catch (error) {
        console.error("Error fetching course videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 pt-[72px] h-full">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-[2.5] bg-gray-50 dark:bg-gray-900">
          <div className="bg-gray-700">
            <VideoPlayer video={video} />
          </div>
          <TabSection video={video} />
        </main>

        {/* Right Sidebar */}
        <div className="lg:flex-[1.2] hidden lg:block">
          <div className="sidebar lg:flex-[1.2] hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
