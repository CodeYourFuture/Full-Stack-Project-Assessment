import React, { useContext } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import Context from "../Context/Context";

const DeleteModal = ({ id, closeModal }) => {
  const ctx = useContext(Context);

  // Deletes a video
  const deleteVideo = () => {
    closeModal(false);
    fetch(`http://127.0.0.1:5000/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).catch((error) => ctx.setError(error));
    ctx.setVideos(ctx.videos.filter((video) => video.id !== id));
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>Do you want to delete the video?</DialogTitle>
      <DialogContent>
        <DialogContentText>The video will be lost forever</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={deleteVideo}>
          Yes
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => closeModal(false)}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
