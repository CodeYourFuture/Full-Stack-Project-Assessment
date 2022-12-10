import React from "react";

function DeleteButton({ videoData, setVideoData, id }) {
  const handleOnClick = (id) => {
    let result = videoData.filter((vid) => vid.id !== id);
    setVideoData(result);
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
