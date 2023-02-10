import React, { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";

function VoteButton({ rating }) {
  const [count, setCount] = useState(rating);

  function handleVoteAdd() {
    setCount((count) => count + 1);
  }

  function handleVoteSubtract() {
    setCount((count) => count - 1);
  }

  return (
    <div>
      <button className="vote-button button" onClick={handleVoteAdd}>
        <FaRegThumbsUp style={{ color: "green" }} />
      </button>
      {rating ? <span>Rating: {count}</span> : ""}
      <button className="vote-button button" onClick={handleVoteSubtract}>
        <FaRegThumbsDown />
      </button>
    </div>
  );
}

export default VoteButton;
