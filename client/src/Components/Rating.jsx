import React, { useContext } from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import Context from "../Context/Context";

const Rating = ({ rating, video }) => {
  const ctx = useContext(Context);

  return (
    <div className="Rating">
      <ThumbUpIcon onClick={() => ctx.vote(video, "up")} />
      <p>{rating}</p>
      <ThumbDownIcon onClick={() => ctx.vote(video, "down")} />
    </div>
  );
};

export default Rating;
