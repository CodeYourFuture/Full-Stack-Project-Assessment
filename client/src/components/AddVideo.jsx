import { useState } from "react";
import createVideoPlayer from "../utils/createVideoPlayer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddVideo({ addVideo }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addVideo(title, url);
    setTitle("");
    setUrl("");
    createVideoPlayer(url);
    handleClose();
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Button
        variant='outlined'
        onClick={handleClickOpen}
      >
        Add Video
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title and URL of the video you want to add.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Title'
            type='text'
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            margin='dense'
            id='url'
            label='URL'
            type='text'
            fullWidth
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddVideo;
