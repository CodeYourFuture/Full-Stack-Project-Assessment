import React, { useState } from "react";
import updateVote from "../utils/updateVote";
export default function VideoVote({ rating, id }) {
  const [voteCount, setVoteCount] = useState(rating);
  function handleLike() {
    updateVote(1, id).then((response) => {
      response.status === 200 &&
        setVoteCount((prev) => prev + 1);
    });
  }
  function handleDislike() {
    updateVote(-1, id).then((response) => {
      response.status === 200 &&
        setVoteCount((prev) => (prev > 0 ? prev - 1 : 0));
    });
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
