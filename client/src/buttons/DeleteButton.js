import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useGlobalContext } from '../context/VideoContext';

function DeleteButton({ id }) {
  const { handleDelete } = useGlobalContext()
  return (
    <AiFillDelete
      aria-label="delete video"
      style={{ color: 'white', fontSize: '30px' }}
      onClick={() => handleDelete(id)
      } />
  );
}

export default DeleteButton