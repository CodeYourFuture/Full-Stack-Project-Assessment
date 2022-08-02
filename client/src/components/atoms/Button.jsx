import React from "react";
import "../../App.css";

function Button({ id, btnName, handleClick, style }) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        handleClick(id);
      }}
      style={style}
    >
      {btnName}
    </button>
  );
}

export default Button;
