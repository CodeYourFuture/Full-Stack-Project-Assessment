import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Buttons = () => {
  const [totalVotes, setTotalVotes] = useState(0);
  const increaseVote = () => {
    setTotalVotes(totalVotes + 1);
  };
  const decreaseVote = () => {
    if (totalVotes > 0) {
      setTotalVotes(totalVotes - 1);
    }
  };

  return (
    <div>
      <div className="btn-container">
        <button aria-label="up-vote">
          <FontAwesomeIcon
            role="button"
            icon={faThumbsUp}
            size="3x"
            onClick={increaseVote}
            style={{ color: "green" }}
          />
        </button>
        <p className="votes">{totalVotes} votes</p>
        <button aria-label="down-vote">
          <FontAwesomeIcon
            role="button"
            icon={faThumbsDown}
            size="3x"
            onClick={decreaseVote}
            style={{ color: "red" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
