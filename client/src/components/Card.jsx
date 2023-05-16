import React, { useState } from "react";
import "./Card.css";
import {
  RiThumbUpFill,
  RiThumbDownFill,
  RiDeleteBin5Fill,
} from "react-icons/ri";

const Card = ({ id, title, url, date, rating, onDelete }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRateUp = () => {
    if (id) {
      // Check if the provided id matches the card's id
      setCurrentRating(currentRating + 1);
    }
  };

  const handleRateDown = () => {
    if (id && currentRating > 0) {
      // Check if the provided id matches the card's id and current rating is above zero
      setCurrentRating(currentRating - 1);
    }
  };

  const handleDeleteCard = () => {
    if (id) {
      // Check if the provided id matches the card's id
      onDelete(id);
    }
  };

  return (
    <div className="card">
      <h2>{title}</h2>

      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${url}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>Rating: {currentRating}</p>
      <div className="card-date">
        Added on: {date.toLocaleString()}
      </div>
      <div className="btn-group">
        <button className="rate-btn up" onClick={handleRateUp}>
          <RiThumbUpFill size={32} />
        </button>
        <button className="rate-btn down" onClick={handleRateDown}>
          <RiThumbDownFill size={32} />
        </button>
        <button className="delete-btn" onClick={handleDeleteCard}>
          <RiDeleteBin5Fill size={32} />
        </button>
      </div>
    </div>
  );
};

export default Card;
