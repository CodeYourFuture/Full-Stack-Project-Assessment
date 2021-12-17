import React from "react";
const DeleteVideoButton = ({ deleteVideo, videoId }) => {
  return (
    <button className="delete-btn" onClick={() => deleteVideo(videoId)}>
      Delete Video
    </button>
  );
};
export default DeleteVideoButton;
