import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  console.log(video);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [video]);

  return (
    <div className="video-player lg:w-[80%] md:w-[90%] mx-auto">
      <ReactPlayer
        url={video.video_file}
        playing={false}
        controls
        width="100%"
        height="auto"
        config={{
          file: {
            attributes: {
              poster: video.poster,
              controlsList: "nodownload",
              playsInline: true,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
