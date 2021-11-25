import React, { useState } from 'react';

export default function VideoVotes () {
  const [ votes , setVotes] = useState(0);
  function increaseVotesByOne() {
    setVotes(votes + 1);
  }
  function decreaseVotesByOne() {
    if (votes > 0) {
      setVotes(votes - 1);
    }
  }

  return (
    <div className="vote-icons">
      <i class="fas fa-thumbs-up" onClick={increaseVotesByOne}></i>
      <i class="fas fa-thumbs-down" onClick={decreaseVotesByOne}></i>
    </div>
  );
}