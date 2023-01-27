import React from "react";
import { TextField, Button } from "@mui/material";

const AddVideoForm = ({ handleSubmit, title, setTitle, url, setUrl, message }) => {

  return (
    <form onSubmit={handleSubmit} className="form_submit">
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
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Add Video
      </Button>
      <span className="warning_messages">{message}</span>
    </form>
  );
};

export default AddVideoForm;
