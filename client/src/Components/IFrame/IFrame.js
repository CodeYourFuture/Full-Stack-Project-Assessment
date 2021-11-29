import CardMedia from "@mui/material/CardMedia";
import React from "react";

const IFrame = (props) => {
  return (
    <CardMedia
      component="iframe"
      src={`https://www.youtube.com/embed/${props.video}`}
      height="240"
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default IFrame;
