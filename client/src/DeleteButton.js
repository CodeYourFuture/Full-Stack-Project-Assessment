import React from "react";

function DeleteButton({ removeVid, id }) {
  return (
    <div className="dltBtn">
      <button onClick={() => removeVid(id)}>Delete</button>
    </div>
  );
}

export default DeleteButton;
