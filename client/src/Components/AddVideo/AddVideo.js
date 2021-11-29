import React, { useState } from "react";
import { TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const AddVideo = ({ toggleDrawer }) => {
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = [
      {
        id: uuidv4(),
        title: newTitle,
        url: newUrl,
        rating: 0,
      },
    ];
    console.log(newVideo);
    toggleDrawer(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          sx={{ m: 1 }}
          id="title-input"
          label="Title"
          variant="outlined"
          size="small"
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <TextField
          sx={{ m: 1 }}
          id="url-input"
          label="Url"
          variant="outlined"
          size="small"
          onChange={(e) => setNewUrl(e.target.value)}
          required
        />
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
          endIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </FormControl>
    </form>
  );
};

export default AddVideo;
