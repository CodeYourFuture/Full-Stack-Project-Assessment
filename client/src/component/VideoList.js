import React from "react";
import VideoItem from "./VideoItem";



const VideoList = ({ videos, onRemove }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default VideoList;
