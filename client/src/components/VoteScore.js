import React, { useState } from "react";

const VoteScore = ({rating, increaseRating, decreaseRating }) => {
 
  return (
    <div>
      <button onClick={increaseRating}>Up Vote</button>

      <button onClick={decreaseRating}>Down Vote</button>
    </div>
  );
};

export default VoteScore;
