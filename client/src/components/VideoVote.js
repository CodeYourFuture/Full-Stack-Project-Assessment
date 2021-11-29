import React, { useState } from "react";
import updateVote from "../utils/updateVote";
export default function VideoVote({ rating, id }) {
  const [voteCount, setVoteCount] = useState(rating);
  function handleLike() {
    updateVote(1, id, setVoteCount);
  }
  function handleDislike() {
    updateVote(-1, id, setVoteCount);
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
