import React from "react";

const ButtonDelete = (props) => {
  return (
    <button
      onClick={() => props.removeVideo(props.videoId)}
      className="btn btn-danger"
    >
      Delete
    </button>
  );
};

export default ButtonDelete;
