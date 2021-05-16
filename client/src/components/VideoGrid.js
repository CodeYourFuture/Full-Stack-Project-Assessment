import React from "react";
import VideoContainer from "./VideoContainer";

const VideoGrid = ({ videoList }) => {
  return (
    <div>
      {videoList.map((video) => (
        <VideoContainer
          key={video.id}
          videoId={video.url.split("=")[1]}
          videoTitle={video.title}
          videoRating={video.rating}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
