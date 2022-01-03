import React from "react";
import Search from "./Search";
import VideoAddingComponent from "./VideoAddingComponent";

const VideoOptions = ({ videos, setVideos }) => {
  return (
    <div>
      <VideoAddingComponent videos={videos} setVideos={setVideos} />
      <Search videos={videos} setVideos={setVideos} />
    </div>
  );
};

export default VideoOptions;
