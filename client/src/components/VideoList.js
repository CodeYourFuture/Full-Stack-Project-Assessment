import React from "react";
import Video from "./Video";

const VideoList = ({ videos, handleVote, handleRemove }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <Video
          key={video.id}
          video={video}
          handleVote={handleVote} // Pass the handleVote function here
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default VideoList;
