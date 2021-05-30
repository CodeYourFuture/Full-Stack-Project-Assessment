import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteButton = ({ id, videoRemover }) => {


  return (
    <div className='delete-button-container'>
      <Button
        id={id}
        onClick={() => videoRemover(id)}
        variant='contained'
        color='secondary'
        className='delete-button'
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    </div>
  );

};

export default DeleteButton;