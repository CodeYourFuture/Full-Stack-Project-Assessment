import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Context from "../Context/Context";

const AddVideo = () => {
  const ctx = useContext(Context);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="AddVideo">
      <TextField
        variant="standard"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        variant="standard"
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button variant="contained" onClick={() => ctx.addVideo(title, url)}>
        Add
      </Button>
    </div>
  );
};

export default AddVideo;
