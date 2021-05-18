import React from "react";
import VideoContainer from "./VideoContainer";

const VideoGrid = ({ videoList, setVideoList }) => {
  return (
    <div>
      {videoList.map((video) => (
        <VideoContainer
          key={video.title}
          videoId={video.url.split("=")[1]}
          videoTitle={video.title}
          videoRating={video.rating}
          videoList={videoList}
          setVideoList={setVideoList}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
