import React from 'react'

function DeleteButton({ deleteB, id }) {
<<<<<<< HEAD
  // let deleteB = deleteVideo
  return (
    <button className="p-2 mb-1 bg-danger text-white delete-button" onClick={() => deleteB(id)}>Delete</button>
=======
  return (
    <button class="p-2 mb-1 bg-danger text-white delete-button" onClick={() => deleteB(id)}>Delete</button>
>>>>>>> 27e0169 (Updated Course Work with new Navbar)
  );
}

export default DeleteButton