import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

function DeleteButton({ handleDelete, id }) {
  return (
    <AiFillDelete
      aria-label="delete video"
      style={{ color: 'white', fontSize: '30px' }}
      onClick={() => handleDelete(id)
      } />
  );
}

export default DeleteButton