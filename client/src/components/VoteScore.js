import React from "react";

const VoteScore = ({increaseRating, decreaseRating }) => {
 
  return (
    <div>
      <button onClick={increaseRating}>Up Vote</button>

      <button onClick={decreaseRating}>Down Vote</button>
    </div>
  );
};

export default VoteScore;
