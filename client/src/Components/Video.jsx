import React, { useContext } from "react";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

import Rating from "./Rating";

import Context from "../Context/Context";

const Video = ({ data }) => {
  const ctx = useContext(Context);

  return (
    <div className="Video">
      <h2>{data.title}</h2>
      <iframe
        title={data.title}
        width="350vw"
        height="250vh"
        src={data.url}
      ></iframe>
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
