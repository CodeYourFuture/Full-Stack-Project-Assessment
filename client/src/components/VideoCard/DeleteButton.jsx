import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = (props) => {
  return (
    <IconButton
      aria-label="delete"
      size="large"
      onClick={props.handleBtnClick}
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );
};

export default DeleteButton;
