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
      <div>
        <div className="vote-buttons">
          <div className="upvote-button-container">
            <button
              onClick={incrementCount}
              className="btn vote-btn upvote-button"
            >
              Up Vote
            </button>
          </div>

          <div className="no-of-votes-for-video">
            <p className="votes">{vote}</p>
          </div>

          <div className="downvote-button-container">
            <button
              onClick={decrementCount}
              className="btn vote-btn downvote-button"
            >
              Down Vote
            </button>
          </div>
        </div>
      </div>
    );
}

export default VoteButtons;