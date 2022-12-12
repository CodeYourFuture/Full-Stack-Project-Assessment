import React from "react";

function DeleteButton({ vidId, deleteVideo }) {
  const id = vidId;

  return (
    <button
      class="p-2 mb-1 bg-danger text-white delete-button"
      onClick={() => {
        deleteVideo(id);
      }}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
