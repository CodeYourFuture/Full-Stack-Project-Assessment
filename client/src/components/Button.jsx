import React from "react";

function Button({ onDelete, id }) {
  return (
    <button
      onClick={() => onDelete(id)}
      className="rounded bg-gray-200 p-2 text-lg font-bold"
    >
      Delete ❌
    </button>
  );
}

export default Button;
