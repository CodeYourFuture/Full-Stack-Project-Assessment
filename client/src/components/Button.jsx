import React from "react";

function Button({ onDelete, id }) {
  return (
    <button
      onClick={() => onDelete(id)}
      className="rounded bg-gray-200 p-1 text-lg font-bold hover:bg-gray-400 focus:bg-red-100 sm:px-3 sm:py-6"
    >
      Delete ❌
    </button>
  );
}

export default Button;
