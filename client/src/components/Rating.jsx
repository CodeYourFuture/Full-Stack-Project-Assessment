import React, { useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function Rating(props) {
  const [rating, setRating] = useState(props.video.rating);

  const handleIncrease = () => {
    setRating(rating + 1);
  };

  const handleDecrease = () => {
    setRating(rating - 1);
  };

  return (
    <div>
      <button
        style={{ margin: "20px" }}
        variant="success"
        onClick={() => handleIncrease()}
      >
        <SentimentSatisfiedAltIcon />
      </button>
      <span style={{ color: "darkgoldenrod", margin: "20px" }}>{rating}</span>
      <button
        style={{ margin: "20px" }}
        variant="danger"
        onClick={() => handleDecrease()}
      >
        <SentimentVeryDissatisfiedIcon />
      </button>
    </div>
  );
}

export default Rating;
