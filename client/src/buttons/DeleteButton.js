import React from 'react'

function DeleteButton({ deleteVideo, value }) {
  return (
    <button
      onClick={deleteVideo}
      value={value}
      class="p-2 mb-1 bg-danger text-white delete-button"
    >
      Delete
    </button>
  );
}
// this is a github test
export default DeleteButton