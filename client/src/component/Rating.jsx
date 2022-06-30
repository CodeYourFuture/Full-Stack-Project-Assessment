import React, { useState } from "react";

const Rating = (props) => {
  const [vote, setVote] = useState(props.rating);

  const handleVote = (upVote) => {
    setVote(upVote ? vote + 1 : vote - 1);
  };

  return (
    <div>
      <div className="rating">
        <img
          src="https://img.icons8.com/material-sharp/452/facebook-like--v1.png"
          alt="Like"
          onClick={() => {
            handleVote(true);
          }}
        />

        <p>{vote}</p>
        <img
          src="https://img.icons8.com/material-sharp/452/thumbs-down.png"
          alt="Dislike"
          onClick={() => {
            handleVote(false);
          }}
        />
      </div>
    </div>
  );
};

export default Rating;
