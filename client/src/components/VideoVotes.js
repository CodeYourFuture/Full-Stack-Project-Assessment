import React, { useState } from 'react';

export default function VideoVotes () {
  const [ totalVotes , setTotalVotes] = useState(0);
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