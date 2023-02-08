import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteBtn(props) {
  const { id } = props;

  const handleDelete = (id) => {
    fetch(`/videos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    window.location.reload();
  };
  return (
    <div className="delete">
      <button onClick={() => handleDelete(id)}>
        <DeleteIcon />
        Delete
      </button>
    </div>
  );
}

export default DeleteBtn;
