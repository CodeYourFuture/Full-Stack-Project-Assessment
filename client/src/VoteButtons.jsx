import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
function VoteButtons(props) {
  const [numVotes, setNumVotes] = useState(props.video.rating);

  function handleLikeClick() {
    setNumVotes(numVotes + 1);
  }

  function handleDislikeClick() {
    setNumVotes(numVotes - 1);
  }

  return (
    <div className="video-Btn">
      <button className="btn btn-primary" onClick={handleLikeClick}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <button className="btn btn-primary" onClick={handleDislikeClick}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
      <span>Votes: {numVotes}</span>
    </div>
  );
}

export default VoteButtons;
