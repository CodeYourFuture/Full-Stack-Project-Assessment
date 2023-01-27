import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function VoteButtons(props) {
  const [numVotes, setNumVotes] = useState(props.video.rating);

  //Increase the Ratings
  function handleLikeClick() {
    setNumVotes(numVotes + 1);
    fetch(`http://localhost:5000/videos/${props.video.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: numVotes + 1 }),
    })
      .then((response) => response.json())
      .then((data) => setNumVotes(data.rating))
      .catch((error) => console.error(error));
  }

  //decrease the Ratings
  function handleDislikeClick(id) {
    setNumVotes(numVotes - 1);
    fetch(`http://localhost:5000/videos/${props.video.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: numVotes - 1 }),
    })
      .then((response) => response.json())
      .then((data) => setNumVotes(data.rating))
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
