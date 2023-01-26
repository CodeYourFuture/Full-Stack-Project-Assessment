import React from "react";

function DeleteBtn(props) {
  const { videos, id, data } = props;

  const handleDelete = () => {
  videos(data.filter((dest) => dest.id !== id))
  };
  return (
    <div className="container">
      <button  onClick={handleDelete}>
      Delete</button>
    </div>
  );
}

export default DeleteBtn;