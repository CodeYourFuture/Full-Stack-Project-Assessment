import React from "react";
import "./Card.css";
import {
  RiThumbUpFill,
  RiThumbDownFill,
  RiDeleteBin5Fill,
} from "react-icons/ri";

const Card = ({ id, title, url, rating }) => {
  const handleRateUp = () => {
    // Handle rate up logic
  };

  const handleRateDown = () => {
    // Handle rate down logic
  };

  const handleDeleteCard = () => {
    // Handle delete card logic
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${url}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>Rating: {rating}</p>
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
