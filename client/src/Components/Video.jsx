import React, { useContext } from "react";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import Rating from "./Rating";

import Context from "../Context/Context";

const Video = ({ data }) => {
  const ctx = useContext(Context);

  let shortTitle = "";
  for (let i = 0; i < 20; i++) {
    shortTitle += data.title[i];
  }
  shortTitle = shortTitle.concat("...");
  console.log(shortTitle);

  return (
    <div className="Video">
      <h2 className="video-title">{shortTitle}</h2>
      <iframe className="frame" title={data.title} src={data.url}></iframe>
      <Rating rating={data.rating} video={data} />
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => ctx.deleteVideo(data)}
      >
        Delete
      </Button>
    </div>
  );
};

export default Video;
