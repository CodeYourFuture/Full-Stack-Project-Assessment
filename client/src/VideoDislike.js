import React from "react";

const VideoDislike = ({ voteDown }) => {
  return (
    <button onClick={voteDown} className="dislikeVideo">
      👎
    </button>
  );
};

export default VideoDislike;

