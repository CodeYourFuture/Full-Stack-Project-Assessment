import React, { useContext } from "react";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import Rating from "./Rating";

import Context from "../Context/Context";

const Video = ({ id, title, url, rating, posted }) => {
  const ctx = useContext(Context);

  // Trims the title if it's too long
  let trimmedTitle = "";
  for (let i = 0; i < 20; i++) {
    trimmedTitle += title[i];
  }
  trimmedTitle = trimmedTitle.concat("...");

  return (
    <div className="Video">
      <h2 className="video-title">
        {/* Shows the smaller title */}
        {title.length < 20 ? title : trimmedTitle}
      </h2>
      <iframe className="frame" title={title} src={url}></iframe>
      <Rating videoId={id} rating={rating} />
      <p>Posted: {posted ? posted : "N/A"}</p>
      {/* Alternate text if the video
      does not have a posted date */}
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => ctx.deleteConfirm(id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default Video;
