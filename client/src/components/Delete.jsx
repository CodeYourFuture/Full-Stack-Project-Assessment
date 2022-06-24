import React from "react";

const Delete = ({ videoId, deleteHandler }) => {
  return (
    <div>
      <button
        onClick={() => {
          deleteHandler(videoId);
        }}
      >
        Delete
      </button>  
    </div>
  );
};

export default Delete;
