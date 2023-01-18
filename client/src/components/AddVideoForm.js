import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddVideoForm({
  handleClickOpen,
  handleClose,
  handleInputChange,
  handleSubmit,
  open,
}) {
  return (
    <div>
      <Button
        sx={{ m: 4 }}
        variant="contained"
        onClick={handleClickOpen}
        color="info"
      >
        Add New Video
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please insert the video's title and link
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="url"
            label="Link"
            type="url"
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            color="inherit"
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddVideoForm;
