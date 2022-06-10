import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

const ButtonVote = (props) => {
  const [votes, setVotes] = useState(props.rating);

  const handleClick = (voteCount) => {
    setVotes((currentVotes) => currentVotes + voteCount);
  };

  return (
    <div className="vote-container">
      <FontAwesomeIcon
        onClick={() => handleClick(1)}
        className="vote-icon"
        icon={faThumbsUp}
      />
      <h4>{votes}</h4>
      <FontAwesomeIcon
        onClick={() => handleClick(-1)}
        className="vote-icon"
        icon={faThumbsDown}
      />
    </div>
  );
};

export default ButtonVote;
