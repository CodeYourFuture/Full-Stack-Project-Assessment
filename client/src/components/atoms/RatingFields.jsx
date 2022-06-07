import React, { useState } from "react";
import "../../App.css";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import axios from "axios";

function Rating({ video }) {
  const [newRating, setNewRating] = useState(video.rating);

  function updateRating(id, vote) {
    const updatedVotes = newRating + vote;
    setNewRating(updatedVotes);
    axios
      .put(`/api/${id}/`, { rating: updatedVotes })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="d-flex justify-content-center">
      <button className="iconButton">
        <BsFillHandThumbsUpFill
          className="iconSize"
          onClick={() => updateRating(video.id, 1)}
        />
        <span className="sr-only">Vote Up</span>
      </button>
      <p style={{ marginBottom: 0 }} className="card-text">
        Rating: {newRating}
      </p>
      <button className="iconButton">
        <BsFillHandThumbsDownFill
          className="iconSize"
          onClick={() => {
            updateRating(video.id, -1);
          }}
        />
        <span className="sr-only">Vote Down</span>
      </button>
    </div>
  );
}

export default Rating;
