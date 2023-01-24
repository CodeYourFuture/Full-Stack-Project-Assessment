import React from "react";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const LikeButton = (props) => {
  return (
    <IconButton aria-label="delete" size="large" onClick={props.handleBtnClick}>
      <ThumbUpIcon />
    </IconButton>
  );
};

export default LikeButton;
