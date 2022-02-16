import React, { useState } from 'react';
import Ratings from './Ratings';

const Vote = (props) => {
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  
  const handleDownVote = (id) => {
    setDownVote(downVote - 1);
  };

  const handleUpVote = () => {
    setUpVote(upVote + 1);
  };

  return (
    <div className='voteStyle'>
      <button
        id={props.video.id}
        className="upBtn"
        onClick={() => handleUpVote()}
      >
        up Vote
      </button>
      <Ratings video={props.video} upVote={upVote} downVote={downVote}/>
      <button
        id={props.video.id}
        className="downBtn"
        onClick={() => handleDownVote()}
      >
        Down Vote
      </button>
    </div>
  );
};

export default Vote;
