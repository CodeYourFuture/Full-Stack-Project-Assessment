import React from 'react'

function DeleteButton({ handleDelete, id }) {
  return (
    <button class="p-2 mb-1 bg-danger text-white delete-button" aria-label="delete video" onClick={() => handleDelete(id)}>Delete</button>
  );
}

export default DeleteButton