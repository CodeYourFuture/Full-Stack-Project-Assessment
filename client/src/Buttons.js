import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Buttons = () => {
  const [totalVotes, setTotalVotes] = useState(0);
  const increaseVote = () => {
    setTotalVotes(totalVotes + 1);
  };
  const decreaseVote = () => {
    if (totalVotes >= 0) {
      setTotalVotes(totalVotes - 1);
    }
  };

  return (
    <div>
      <div className="btn-container">
        <FontAwesomeIcon
          icon={faThumbsUp}
          size="3x"
          onClick={increaseVote}
          style={{ color: "green" }}
        />
        <p className="votes">{totalVotes} votes</p>
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="3x"
          onClick={decreaseVote}
          style={{ color: "red" }}
        />
      </div>
    </div>
  );
};

export default Buttons;
