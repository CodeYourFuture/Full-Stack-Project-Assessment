import React from "react";

function DeleteButton({ videoId, deleteVideos }) {
  return (
    <button
      className="p-2 mb-1 bg-danger text-white delete-button"
      onClick={() => {
        deleteVideos(videoId);
      }}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
