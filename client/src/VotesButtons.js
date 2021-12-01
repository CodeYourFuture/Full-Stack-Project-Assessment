import React, { useState } from "react";

const VotesButtons = () => {
  const [votes, setVotes] = useState(0);
  const upVote = event => setVotes(votes + 1);
  const downVote = event => setVotes(votes - 1);

  return (
    <div>
      <button onClick={upVote} className="m-2 btn btn-sm btn-success">+</button>
      <span className="m-2 p-2 badge bg-primary">{votes}</span>
      <button onClick={downVote} className="m-2 btn btn-sm btn-warning">-</button>
      <button className="m-2 btn btn-sm btn-danger">Delete</button>
    </div>
  );
};

export default VotesButtons;
