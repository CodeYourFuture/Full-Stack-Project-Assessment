import React, { useState } from "react";

function Votes({ data }) {
  const [vote, setVote] = useState(data.rating ? data.rating : 0);

  function voteUp() {
    return setVote((vote) => vote + 1);
  }

  function voteDown() {
    return setVote((vote) => vote - 1);
  }

  return (
    <div className="votes">
      <button
        className="btn btn-outline-secondary btn-sm vote-buttons"
        onClick={voteUp}
      >
        Up Vote
      </button>
      <p>{vote ? vote : 0} votes</p>
      <button
        className="btn btn-outline-secondary btn-sm vote-buttons"
        onClick={voteDown}
      >
        Down Vote
      </button>
    </div>
  );
}

export default Votes;
