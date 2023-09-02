import React from "react";
import Video from "./Video";

const VideoList = ({ videos, onVote, onDelete }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <Video
          key={video.id}
          video={video}
          onVote={onVote}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
export default VideoList;
