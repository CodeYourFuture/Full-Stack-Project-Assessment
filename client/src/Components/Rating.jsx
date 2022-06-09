import React, { useContext } from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import Context from "../Context/Context";

const Rating = ({ rating, videoId }) => {
  const ctx = useContext(Context);

  return (
    <div className="Rating">
      <ThumbUpIcon onClick={() => ctx.vote(videoId, "up")} />
      <p>{rating}</p>
      <ThumbDownIcon onClick={() => ctx.vote(videoId, "down")} />
    </div>
  );
};

export default Rating;
