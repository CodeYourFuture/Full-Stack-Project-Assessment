import React from "react";

function Delete({ handleClick }) {
  return (
    <div>
      <button className="button" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}
export default Delete;
