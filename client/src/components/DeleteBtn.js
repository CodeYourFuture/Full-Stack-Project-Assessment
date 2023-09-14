import React from "react";

const DeleteBtn = ({ videoId, onDelete }) => {
  const handleDelete = () => {
    onDelete(videoId);
  };

  return <button onClick={handleDelete}>Delete</button>;
};
export default DeleteBtn;
