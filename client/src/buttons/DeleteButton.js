import React from "react";

function DeleteButton({ video, onDelete }) {
  return (
    <button
      className="p-2 mb-1 btn btn-sm btn-outline-danger"
      type="button"
      onClick={() => onDelete()}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
