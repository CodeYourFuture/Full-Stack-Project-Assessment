import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteModal = ({ id, handleDelete, closeModal }) => {
  const confirm = () => {
    handleDelete(id);
    closeModal(false);
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>Do you want to delete the video?</DialogTitle>
      <DialogContent>
        <DialogContentText>The video will be lost forever</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={confirm}>
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
