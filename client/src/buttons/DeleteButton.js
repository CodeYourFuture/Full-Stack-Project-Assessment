import React from "react";

function DeleteButton({ videoData, setVideoData, id }) {
  const handleOnClick = (id) => {
    console.log(id);
  };

  return (
    <button
      className="p-2 mb-1 bg-danger text-white delete-button"
      onClick={() => handleOnClick(id)}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
