// VideoList.js
import React from "react";
import Video from "./Video";

const VideoList = ({ videos, onVote, onRemove }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {videos.map((video) => (
        <Video
          key={video.id}
          video={video}
          onVote={onVote}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default VideoList;
