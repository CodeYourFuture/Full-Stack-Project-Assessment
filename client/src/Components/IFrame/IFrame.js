import CardMedia from "@mui/material/CardMedia";
import React from "react";

const IFrame = ({ video }) => {
  return (
    <CardMedia
      component="iframe"
      src={`https://www.youtube.com/embed/${video}`}
      width="300"
      height="192"
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default IFrame;
