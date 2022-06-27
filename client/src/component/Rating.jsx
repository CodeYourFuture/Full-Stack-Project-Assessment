import React, { useState } from "react";

const Rating = (props) => {
  const [vote, setVote] = useState(props.rating);

  const handleVote = (upVote) => {
    setVote(upVote ? vote + 1 : vote - 1);
  };

  return (
    <div>
      <div className="rating">
        <button
          onClick={() => {
            handleVote(true);
          }}
        >
          UpVote
        </button>
        <p>{vote}</p>
        <button
          onClick={() => {
            handleVote(false);
          }}
        >
          DownVote
        </button>
      </div>
    </div>
  );
};

export default Rating;
