import React from "react";

function DeleteB(props) {
  const handleDelete = (id) => {
    props.setData(props.data.filter((video) => video.id !== id));
  };

  return (
    <button
      onClick={() => handleDelete(props.video.id)}
      className="pl-3 pr-3 mb-4 bg-danger text-white delete-button shadow rounded"
    >
      Delete
    </button>
  );
}

export default DeleteB;
