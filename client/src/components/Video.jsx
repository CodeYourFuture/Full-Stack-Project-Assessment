import React, { useState } from "react";
import "../App.css";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";

function Video({ video, handleClick }) {
  const [rating, setRating] = useState(video.rating);

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
            <BsFillHandThumbsUpFill
              onClick={() => {
                setRating(rating + 1);
              }}
            />
            <span className="sr-only">Vote Up</span>
          </button>
          <p style={{ marginBottom: 0 }} className="card-text">
            Rating: {rating}
          </p>
          <button>
            <BsFillHandThumbsDownFill
              onClick={() => {
                setRating(rating - 1);
              }}
            />
            <span className="sr-only">Vote Down</span>
          </button>
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            handleClick(video.id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default Video;
