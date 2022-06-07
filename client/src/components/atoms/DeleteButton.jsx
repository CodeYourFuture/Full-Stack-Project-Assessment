import React from "react";
import "../../App.css";
import axios from "axios";

function DeleteButton({ load, id }) {
  function handleRemoveItem(clickedId) {
    axios
      .delete(`/api/${clickedId}`)
      .then(() => {
        load();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        handleRemoveItem(id);
      }}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
