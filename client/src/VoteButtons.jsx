import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function VoteButtons(props) {
  const [numVotes, setNumVotes] = useState(props.rating);

  //Increase the Ratings
  function handleLikeClick() {
    setNumVotes(numVotes + 1);
    fetch(`/videos/${props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: numVotes + 1 }),
    })
      .then((response) => setNumVotes(numVotes + 1))
      .catch((error) => console.error(error));
  }

  //decrease the Ratings
  function handleDislikeClick() {
    setNumVotes(numVotes - 1);
    fetch(`/videos/${props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: numVotes - 1 }),
    })
      .then((response) => setNumVotes(numVotes - 1))
      .catch((error) => console.error(error));
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
