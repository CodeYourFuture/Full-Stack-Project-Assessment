import React from 'react'

function DeleteButton({ remove }) {
  return (
    <button className="p-2 text-white delete-button rounded" onClick={remove}><i className='fas fa-trash'></i></button>
  );
}

export default DeleteButton