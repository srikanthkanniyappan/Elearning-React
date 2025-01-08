import api from "./axios.config";

const getAllCourses = async () => {
  try {
    const response = await api.get("/courses/all-courses/");
    return response.data;
  } catch (error) {
    console.error("Error fetching all courses", error);
    throw error;
  }
};

const getCourses = async () => {
  try {
    const response = await api.get("/courses/course-list/");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses", error);
    throw error;
  }
};

const getCoursesWithEnrollmentStatus = async () => {
  try {
    const response = await api.get("/courses/all-courses-with-status/");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses with enrollment status", error);
    throw error;
  }
};

const getCourseDetails = async (courseId) => {
  try {
    const response = await api.get(`/courses/course-details/${courseId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for course ${courseId}`, error);
    throw error;
  }
};

const getCourseVideos = async (courseId) => {
  try {
    const response = await api.get(`/courses/course-videos/${courseId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching videos for course ${courseId}`, error);
    throw error;
  }
};

const getVideo = async (videoId) => {
  try {
    const response = await api.get(`/courses/videos/${videoId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video ${videoId}`, error);
    throw error;
  }
};

const getCourseWatchHistory = async (courseId) => {
  try {
    const response = await api.get(
      `/courses/course-content/${courseId}/watch-history/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching watch history", error);
    throw error;
  }
};

const getVideoWatchHistory = async (videoId) => {
  try {
    const response = await api.get(`/courses/videos/${videoId}/watch-history/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching watch history for video ${videoId}`, error);
    throw error;
  }
};

const updateVideoWatchHistory = async (videoId, data) => {
  try {
    const response = await api.post(
      `/courses/videos/${videoId}/watch-history/update/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating watch history", error);
    throw error;
  }
};

const uploadVideo = async (videoData) => {
  try {
    const response = await api.post("/courses/videos/upload/", videoData);
    return response.data;
  } catch (error) {
    console.error("Error uploading video", error);
    throw error;
  }
};

const enrollInCourse = async (courseId) => {
  try {
    const response = await api.post("/courses/enroll/", {
      course_id: courseId,
    });
    return response.data;
  } catch (error) {
    console.error("Error enrolling in course", error);
    throw error;
  }
};

const updateEnrollmentStatus = async (enrollmentId, status) => {
  try {
    const response = await api.post("/courses/enrollment/update/", {
      enrollment_id: enrollmentId,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating enrollment status", error);
    throw error;
  }
};

const updateLastWatched = async (courseId, videoId) => {
  try {
    const response = await api.post(
      `/courses/course/${courseId}/last-watched/update/`,
      {
        last_watched: videoId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating last watched video for course ${courseId}`,
      error
    );
    throw error;
  }
};

const getLastWatched = async (courseId) => {
  try {
    const response = await api.get(`/courses/course/${courseId}/last-watched/`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching last watched video for course ${courseId}`,
      error
    );
    throw error;
  }
};

export default {
  getCourses,
  getAllCourses,
  getCoursesWithEnrollmentStatus,
  getCourseDetails,
  getCourseVideos,
  getVideo,
  getCourseWatchHistory,
  getVideoWatchHistory,
  updateVideoWatchHistory,
  uploadVideo,
  enrollInCourse,
  updateEnrollmentStatus,
  updateLastWatched,
  getLastWatched,
};
