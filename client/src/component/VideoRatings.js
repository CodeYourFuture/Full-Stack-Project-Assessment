import React from "react";

const VideoRatings = ({ video }) => {
  return (
    <div>
      <button>Like {video.rating}</button>
      <p>Votes</p>
      <button>Dislike{video.rating}</button>
    </div>
  );
};

export default VideoRatings;
