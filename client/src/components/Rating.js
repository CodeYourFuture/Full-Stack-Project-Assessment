import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

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
      <FontAwesomeIcon
        icon={faThumbsUp}
        className="icon"
        onClick={handleClickUpVote}
      />
      <p>{vote}</p>
      <FontAwesomeIcon
        icon={faThumbsDown}
        className="icon"
        onClick={handleClickDownVote}
      />
    </div>
  );
}

export default Rating;
