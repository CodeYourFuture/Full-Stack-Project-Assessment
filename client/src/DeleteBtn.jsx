import React from "react";

function DeleteBtn(props) {
  return (
    <button className="btn btn-danger" onClick={props.handleDelete}>
      Delete
    </button>
  );
}

export default DeleteBtn;
