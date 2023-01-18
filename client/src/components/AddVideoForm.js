import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddVideoForm() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
          />
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link"
            type="url"
            fullWidth
            variant="outlined"
            size="small"
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
            onClick={handleClose}
            color="error"
            size="small"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddVideoForm;
