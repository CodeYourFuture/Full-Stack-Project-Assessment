import React, { useState } from "react";

function VoteButton() {
  const [count, setCount] = useState(25);

  function handleVoteAdd() {
    setCount((count) => count + 1);
  }

  function handleVoteSubtract() {
    setCount((count) => count - 1);
  }

  return (
    <div>
      <button className="vote-button button" onClick={handleVoteAdd}>
        👍
      </button>
      {count}
      <button className="vote-button button" onClick={handleVoteSubtract}>
        👎
      </button>
    </div>
  );
}

export default VoteButton;
