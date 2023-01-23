import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteBtn(props) {
  const { videos, id, data } = props;

  const handleDelete = () => {
  videos(data.filter((dest) => dest.id !== id))
  };
  return (
    <div className="container">
      <button  onClick={handleDelete}>
      <DeleteIcon />
      Delete</button>
    </div>
  );
}

export default DeleteBtn;