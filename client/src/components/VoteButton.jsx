import React, { useState } from "react";

function VoteButton() {
  const [count, setCount] = useState(25);
  function handleVoteSubtract() {
    //let index = videos.forEach((video) => video.id === videoId);
    setCount(count - 1);
  }

  function handleVoteAdd() {
    //let index = videos.forEach((video) => video.id === videoId);
    setCount(count + 1);
  }
  return (
    <div>
      {/* onClick={handleVoteAdd(video.id)  onClick={handleVoteSubtract(video.id) */}
      <button
        className="vote-button"
        // onClick={() => setCount((count) => count + 1)}
        onClick={handleVoteAdd}
      >
        👍
      </button>
      {count}
      <button className="vote-button" onClick={handleVoteSubtract}>
        👎
      </button>
    </div>
  );
}

export default VoteButton;
