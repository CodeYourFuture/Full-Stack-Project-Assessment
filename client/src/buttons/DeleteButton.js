import React from "react";

function DeleteButton({onDelete }) {
  return (
    <button
      className="p-2 mb-1 btn btn-sm btn-outline-danger"
      type="button"
      aria-label="delete"
      onClick={() => onDelete()}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
