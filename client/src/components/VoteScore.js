import React from "react";

const VoteScore = ({increaseRating, decreaseRating }) => {
 
  return (
    <div className="vote-btns-container">
      <button className="btn" onClick={increaseRating}>
        Up Vote
      </button>

      <button className="btn" onClick={decreaseRating}>
        Down Vote
      </button>
    </div>
  );
};

export default VoteScore;
