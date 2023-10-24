import React from "react";
import { TextField, Button } from "@mui/material";

const AddVideoForm = ({
  handleSubmit,
  title,
  setTitle,
  url,
  setUrl,
  message,
}) => {
  return (
    <form onSubmit={handleSubmit} className="form_submit">
      <TextField
        type="text"
        id="titleField"
        name="titleField"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        autoComplete="off"
        label="Title"
        variant="filled"
        size="small"
        style={{ width: 300, backgroundColor: "#fff" }}
      />
      <TextField
        type="url"
        id="urlField"
        name="urlField"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        autoComplete="off"
        label="URL name"
        variant="filled"
        size="small"
        style={{ width: 300, backgroundColor: "#fff" }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Add Video
      </Button>
      <div>
        <span className="warning_messages">{message}</span>
      </div>
    </form>
  );
};

export default AddVideoForm;
