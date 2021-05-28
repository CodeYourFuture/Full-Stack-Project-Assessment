import React from "react";

const DeleteVideo = ({ id, handleDeleteVid }) => {
  return (
    <div>
      <button className="btn btn-danger" onClick={() => handleDeleteVid(id)}>
        Delete
      </button>
    </div>
  );
};

export default DeleteVideo;
