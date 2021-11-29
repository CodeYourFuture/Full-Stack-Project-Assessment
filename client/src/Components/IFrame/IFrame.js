import CardMedia from "@mui/material/CardMedia";
import React from "react";

const IFrame = ({video}) => {
  return (
    <div>
      <CardMedia
        component="iframe"
        src={`https://www.youtube.com/embed/${video}`}
        height="240"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default IFrame;
