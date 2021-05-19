import React, { useState } from "react";

const VideoRatings = ({ rating }) => {
  const [ratings, setRatings] = useState(rating);

  const handleRating = (increase) => {
    const newRating = increase ? ratings + 1 : ratings - 1;
    setRatings(newRating);
  };
  return (
    <div className="votes">
      <button className="btn btn-success">
        <i className="fas fa-thumbs-up vote" onClick={() => handleRating(true)}>
          &#128077;
        </i>
      </button>
      <p>Votes: {ratings}</p>

      <button className="btn btn-success" onClick={() => handleRating(false)}>
        <i className="fas fa-thumbs-down vote">&#128078;</i>
      </button>
    </div>
  );
};

export default VideoRatings;
