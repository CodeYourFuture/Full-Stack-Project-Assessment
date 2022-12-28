import React from "react";
import Button from "@mui/material/Button";

function DeleteButton({ vidId, deleteVideo }) {
  const id = vidId;

  return (
    <Button
      variant="outlined"
      className="editbutton"
      onClick={() => {
        deleteVideo(id);
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
