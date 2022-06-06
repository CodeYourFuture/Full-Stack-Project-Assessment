import React, { useState } from "react";
import "../App.css";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import axios from "axios";

function Video({ video }) {
  let [newRating, setNewRating] = useState(video.rating);

  function handleRemoveItem(clickedId) {
    axios
      .delete(`/api/${clickedId}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  function updateRating(id, vote) {
    const updatedVotes = newRating + vote;
    setNewRating(updatedVotes);
    axios
      .put(`/api/${id}/`, { rating: updatedVotes })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <li className="col-sm-6">
      <div className="card-body text-center">
        <h4 style={{ height: 55 }} className="card-title">
          {video.title}
        </h4>
        <iframe
          title="YouTube video player"
          width="100%"
          height="300"
          src={video.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="d-flex justify-content-center">
          <button>
            <BsFillHandThumbsUpFill onClick={() => updateRating(video.id, 1)} />
            <span className="sr-only">Vote Up</span>
          </button>
          <p style={{ marginBottom: 0 }} className="card-text">
            Rating: {video.rating}
          </p>
          <button>
            <BsFillHandThumbsDownFill
              onClick={() => updateRating(video.id, -1)}
            />
            <span className="sr-only">Vote Down</span>
          </button>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleRemoveItem(video.id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default Video;
