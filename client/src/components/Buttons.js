import React from "react";

function Buttons({ setTitle, setUrl }) {
  const handleCancel = () => {
    setTitle("");
    setUrl("");
  };

  return (
    <div className="buttons">
      <button
        className="btn btn-warning input"
        type="cancel"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button className="btn btn-success input" type="submit">
        Add
      </button>
    </div>
  );
}

export default Buttons;