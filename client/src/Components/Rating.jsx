import React from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Rating = ({ rating }) => {
  return (
    <div className="Rating">
      <ThumbUpIcon />
      <p>{rating}</p>
      <ThumbDownIcon />
    </div>
  );
};

export default Rating;
