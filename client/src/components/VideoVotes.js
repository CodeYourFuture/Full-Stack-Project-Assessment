import React, { useState } from 'react';

export default function VideoVotes ( {rating}) {
  const [ totalVotes , setTotalVotes] = useState(rating);
  function increaseVotesByOne() {
    setTotalVotes(totalVotes + 1);
  }
  function decreaseVotesByOne() {
    if (totalVotes > 0) {
      setTotalVotes(totalVotes - 1);
    }
  }

  return (
    <div className="vote-icons">
      <i className="fas fa-thumbs-up" onClick={increaseVotesByOne}></i>
      <p> {totalVotes} Likes </p>
      <i className="fas fa-thumbs-down" onClick={decreaseVotesByOne}></i>
    </div>
  );
}