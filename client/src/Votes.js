import React, { useState } from "react";

const Votes = () => {
  const [vote, setVote] = useState(0);

  const handleIncrementVotes = () => {
    const incrementedVote = vote + 1;
    setVote(incrementedVote);
  };

  const handleDecrementVotes = () => {
    const decrementedVote = vote === 0 ? 0 : vote - 1;
    setVote(decrementedVote);
  };
  return (
    <div>
      <button onClick={handleIncrementVotes}>Up Votes</button>
      <h4>{vote}</h4>
      <button onClick={handleDecrementVotes}>Down votes</button>
    </div>
  );
};

export default Votes;
