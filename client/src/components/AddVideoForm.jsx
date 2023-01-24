import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};

const getIdFromYoutubeUrl = (link) => {
  return link.match(REGEXP) ? link.match(REGEXP)[1] : false;
};

const AddVideoForm = ({ setVideos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const addVideo = (event) => {
    event.preventDefault();

    if (!title.trim() || !url.trim()) {
      setMessage("Your field is empty.");
      return;
    } else if (!isValidYoutubeUrl(url.trim())) {
      setMessage("Please enter a valid Youtube link.");
      return;
    }

    let videoId = getIdFromYoutubeUrl(url.trim());
    let videoUrl = `https://youtube.com/embed/${videoId}`;

    const newVideo = {
      id: videoId,
      title: title,
      url: videoUrl,
      rating: 0,
    };
    setVideos((prevVideos) => prevVideos.concat(newVideo));
    setTitle("");
    setUrl("");
    setMessage(`Video ${title} was Added`);
  };

  return (
    <form onSubmit={addVideo} className="form_submit">
      <TextField
        type="text"
        id="videoTitle"
        name="videoName"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        autoComplete="off"
        label="Title"
        variant="filled"
        size="small"
        style={{ width: 426, backgroundColor: "#fff" }}
      />
      <TextField
        type="url"
        id="urlName"
        name="urlName"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        autoComplete="off"
        label="URL name"
        variant="filled"
        size="small"
        style={{ width: 426, backgroundColor: "#fff" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 1 }}
      >
        Add Video
      </Button>
      <span className="warning_messages">{message}</span>
    </form>
  );
};

export default AddVideoForm;
