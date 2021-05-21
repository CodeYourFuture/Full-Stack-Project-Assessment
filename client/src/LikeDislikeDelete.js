import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import ThumbDownAltTwoToneIcon from '@material-ui/icons/ThumbDownAltTwoTone';

const LikeDislikeDelete = ({ video, rating, id, voteUpdater, videoRemover }) => {
  return (
    <div className='buttons-container'>
      <ThumbDownAltTwoToneIcon
        onClick={() => voteUpdater(video, rating - 1)}
        className='dislike'
        fontSize='large'
        variant='contained'
        style={{ color: 'antiquewhite' }}
      />
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
      <ThumbUpAltTwoToneIcon
        onClick={() => voteUpdater(video, rating + 1)}
        className='like'
        fontSize='large'
        variant='contained'
        style={{ color: 'antiquewhite' }}
      />
    </div>
  );

};

export default LikeDislikeDelete;