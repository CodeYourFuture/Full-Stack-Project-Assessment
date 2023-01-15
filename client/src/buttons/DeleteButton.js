import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useGlobalContext } from '../context/VideoContext';

function DeleteButton({ id }) {
  const { handleDelete } = useGlobalContext()
  return (
    <AiFillDelete
      aria-label="delete video"
      style={{ color: 'rgba(255, 149, 0, 0.792)', fontSize: '30px' }}
      onClick={() => handleDelete(id)
      } />
  );
}

export default DeleteButton