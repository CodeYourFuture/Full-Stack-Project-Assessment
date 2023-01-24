import React from "react";
import { IconButton } from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const DislikeButton = (props) => {
  return (
    <IconButton aria-label="delete" size="large" onClick={props.handleBtnClick}>
      <ThumbDownIcon />
    </IconButton>
  );
};

export default DislikeButton;
