import React, { useState } from "react";

export default function VideoVote() {
  const [voteCount, setVoteCount] = useState(0);
  function handleLike() {
    setVoteCount((prev) => prev + 1);
  }
  function handleDislike() {
    setVoteCount((prev) => (prev > 0 ? prev - 1 : 0));
  }
  return (
    <section className="voteContainer">
      <i
        className="fa fa-thumbs-up"
        onClick={() => handleLike()}
      ></i>
      <p>Likes: {voteCount}</p>
      <i
        className="fa fa-thumbs-down"
        onClick={() => handleDislike()}
      ></i>
    </section>
  );
}
