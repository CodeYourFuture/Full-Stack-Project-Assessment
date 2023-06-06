import React, { useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Voting({ rating, onUpdateRating }) {
  const [vote, setVote] = useState(rating);

  const handleClickUpVote = () => {
    const newRating = vote + 1;
    setVote(newRating);
    onUpdateRating(newRating);
  };

  const handleClickDownVote = () => {
    let newRating = 0;
    vote > 0 ? (newRating = vote - 1) : (newRating = 0);
    setVote(newRating);
    onUpdateRating(newRating);
  };
  return (
    <div className="vote">
      <button onClick={handleClickDownVote}>
        <ThumbDownIcon />
      </button>
      <p>{vote}</p>
      <button onClick={handleClickUpVote}>
        <ThumbUpIcon />
      </button>
    </div>
  );
}

export default Voting;
