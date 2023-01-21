import React, { useState } from 'react';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";


function Rating(props) {

    const [rating, setRating] = useState(props.video.rating);
    //console.log(rating);
    const handleIncrease=() => {
      setRating(rating + 1);
    };

    const handleDicrease = () => {
      setRating(rating - 1);
    };

    

  return (
    <div>

      <button
        style={{ margin: "20px" }}
        variant="success"
        onClick={() => handleIncrease()}
      >
        <ThumbUpIcon />
      </button>
      <span style={{ color: "darkgoldenrod", margin: "20px" }}>{rating}</span>
      <button
        style={{ margin: "20px" }}
        variant="danger"
        onClick={() => handleDicrease()}
      >
        <ThumbDownIcon />
      </button>

    </div>
  );
}

export default Rating;
