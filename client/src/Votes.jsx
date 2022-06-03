import React, { useState } from "react";

function Votes({ data }) {
  const [vote, setVote] = useState(data);

  function voteUp() {
    setVote((vote) => vote + 1);
  }

  function voteDown() {
    setVote((vote) => vote - 1);
  }
  return (
    <div>
      <p>Votes: {vote} </p>
      <button onClick={voteUp}>Up Vote</button>
      <button onClick={voteDown}>Down Vote</button>
    </div>
  );
}

export default Votes;
