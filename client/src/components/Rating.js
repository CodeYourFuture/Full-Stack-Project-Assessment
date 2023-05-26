import React, { useState } from "react";

import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Rating({ rating, onUpdateRating }) {
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
    <div className="rating">
      <FaThumbsUp className="icon-2" onClick={handleClickUpVote} />
      <p>{vote}</p>
      <FaThumbsDown className="icon-1" onClick={handleClickDownVote} />
    </div>
  );
}

export default Rating;
