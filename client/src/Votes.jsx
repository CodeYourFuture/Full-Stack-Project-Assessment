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
    <div class="votes">
      <button class="btn btn-outline-secondary vote-buttons" onClick={voteUp}>
        Up Vote
      </button>
      <p>Votes: {vote} </p>
      <button class="btn btn-outline-secondary vote-buttons" onClick={voteDown}>
        Down Vote
      </button>
    </div>
  );
}

export default Votes;
