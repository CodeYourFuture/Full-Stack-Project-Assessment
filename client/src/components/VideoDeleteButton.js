import React from "react";

const VideoDeleteButton = ({ handleDeleteVideo }) => {
  return (
    <div>
      <button onClick={handleDeleteVideo}>Delete</button>
    </div>
  );
};

export default VideoDeleteButton;
