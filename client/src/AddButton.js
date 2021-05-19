import React from "react";

function AddButton(props) {
  return (
    <button
      onClick={props.onClickHandler}
      className="btn btn-light ml-5"
      style={
        props.showAddValue
          ? {backgroundColor: "#ff4d4d", color: "white"}
          : {backgroundColor: "white"}
      }
    >
      {props.showAddValue ? "Cancel" : "Add Movie"}
    </button>
  );
}

export default AddButton;
