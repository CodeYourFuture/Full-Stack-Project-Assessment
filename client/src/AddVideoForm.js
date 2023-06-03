import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";

const isValidYouTubeUrl = (url) => {
  // Regular expression to validate YouTube URL
  const youtubeUrlRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
  return youtubeUrlRegex.test(url);
};

const useStyles = styled((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const AddVideoForm = ({ onAddVideo }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear error
    setTitleError("");
    setUrlError("");

    // Validate title and URL
    if (!title.trim()) {
      setTitleError("Video title is required.");
      return;
    }
    if (!isValidYouTubeUrl(url)) {
      setUrlError("Invalid YouTube URL.");
      return;
    }

    const newVideo = {
      id: Math.floor(Math.random() * 900000) + 100000,
      title: title.trim(),
      url: url.trim(),
      rating: 0,
    };

    await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newVideo),
    });

    onAddVideo(newVideo);

    // Clear form fields
    setTitle("");
    setUrl("");

    navigate("/");
  };

  const handleAddVideoClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && <FormHelperText error>{titleError}</FormHelperText>}
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="url">URL</InputLabel>
            <Input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {urlError && <FormHelperText error>{urlError}</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            className={classes.addButton}
          >
            Add Video
          </Button>
        </form>
      ) : (
        <Button
          variant="contained"
          className={classes.addButton}
          onClick={handleAddVideoClick}
        >
          Add Video
        </Button>
      )}
    </div>
  );
};

export default AddVideoForm;
