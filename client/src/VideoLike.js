import React from "react";

const VideoLike = ({ voteUp }) => {
  return (
    <button onClick={voteUp} className="likeVideo">
      👍
    </button>
  );
};

export default VideoLike;
