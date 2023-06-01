import React from "react";
import "./Card.css";
import {
  MdOutlineThumbUp,
  MdOutlineThumbDownAlt,
} from "react-icons/md";
import {ImBin2} from "react-icons/im";



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


    return(
<div className="card">
      <h3>{title}</h3>
      
      <div className="video-responsive">
    <iframe
      width="250"
      height="250"
     src={url.replace("watch?v=", "embed/")}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
      <p>Rating: {rating}</p>
      <div className="btn-section">
        <button className="rate-btn up" onClick={handleRateUp}>
          <MdOutlineThumbUp size={28} />
        </button>
        <button className="rate-btn down" onClick={handleRateDown}>
          <MdOutlineThumbDownAlt size={28} />
        </button>
        <button className="delete-btn" onClick={handleDeleteCard}>
          <ImBin2 size={28} />
        </button>
      </div>
    </div>
    );
};


export default Card;