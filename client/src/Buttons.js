import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import videos from "./exampleresponse.json";

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
  const handleDelete = ({ id, setVideos }) => {
    const filteredVideos = videos.filter((video) => video.id !== id);
    setVideos(filteredVideos);
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
      {/* <div>
        <FontAwesomeIcon icon={faTrashAlt} size="2x" onClick={handleDelete} />
      </div> */}
    </div>
  );
};

export default Buttons;
