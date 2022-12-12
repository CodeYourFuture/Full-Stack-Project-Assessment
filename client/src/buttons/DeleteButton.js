import React from "react";

function DeleteButton({ deleteVideos }) {
  return (
    <button
      class="p-2 mb-1 bg-danger text-white delete-button"
      onClick={deleteVideos}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
