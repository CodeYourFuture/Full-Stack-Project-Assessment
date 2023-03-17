import React from 'react'

function DeleteButton({video, removeItem}) {
  const {id} = video;
  return (
    <button className="p-2 mb-1 bg-danger text-white delete-button" onClick={() =>{removeItem(id)}}>Delete</button>
  );
}

export default DeleteButton