import React, { useState } from "react";

function Rating({ rating, onUpdateRating }) {
  const [vote, setVote] = useState(rating);

  const handleClickUpVote = () => {
    const newRating = vote + 1;
    setVote(newRating);
    onUpdateRating(newRating);
  };

  const handleClickDownVote = () => {
    const newRating = vote - 1;
    setVote(newRating);
    onUpdateRating(newRating);
  };

  return (
    <div className="rating">
      <button onClick={handleClickUpVote}>UpVote</button>
      <p>{vote}</p>
      <button onClick={handleClickDownVote}>DownVote</button>
    </div>
  );
}

export default Rating;
