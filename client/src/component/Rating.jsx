import React, { useState } from "react";

const Rating = ({ rating, videoId, updateRating }) => {
  //const [vote, setVote] = useState(rating);

  // const handleVote = (upVote) => {
  //   setVote(upVote ? vote + 1 : vote - 1);
  // };

  return (
    <div>
      <div className="rating">
        <img
          src="https://img.icons8.com/material-sharp/452/thumbs-down.png"
          alt="Dislike"
          onClick={() => {
            updateRating(rating - 1, videoId);
          }}
        />
        <p>{rating}</p>
        <img
          src="https://img.icons8.com/material-sharp/452/facebook-like--v1.png"
          alt="Like"
          onClick={() => {
            updateRating(rating + 1, videoId);
          }}
        />
      </div>
    </div>
  );
};

export default Rating;
