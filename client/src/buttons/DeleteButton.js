import React from 'react'

function DeleteButton({ deleteB, id }) {
  // let deleteB = deleteVideo
  return (
    <button className="p-2 mb-1 bg-danger text-white delete-button" onClick={() => deleteB(id)}>Delete</button>
  );
}

export default DeleteButton