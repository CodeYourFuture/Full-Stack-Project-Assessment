import React, { useState } from "react";

function VoteButtons() {
    const [vote, setVote] = useState(0);

    function incrementCount() {
        setVote(vote + 1);
    }

    function decrementCount() {
        setVote(vote - 1);
    }

    return (
      <div className="vote-buttons">
        {/* no of votes */}
        <div className="no-of-votes-for-video">
          <p>{vote}</p>
        </div>

        {/* up vote button */}
        <div className="upvote-button-container">
          <button onClick={incrementCount} className="upvote-button">
            Up Vote
          </button>
        </div>

        {/* down vote button */}
        <div className="downvote-button-container">
          <button onClick={decrementCount} className="downvote-button">
            Down Vote
          </button>
        </div>
      </div>
    );
}

export default VoteButtons;