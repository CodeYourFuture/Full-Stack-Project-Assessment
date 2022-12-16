import React, { useState, useEffect, useRef } from "react";
import AddButton from "./buttons/AddButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    ref.current.focus();
    let vidObj = {
      id: `${url.slice(url.indexOf("=") + 1)}`,
      title: title,
      url: url,
      rating: 0,
    };
    addVideo(vidObj);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "75ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleAdd}
      className="formStyle" >
    
        <div className="search-row">
          <TextField
            label="Video Title"
            color="secondary"
            focused
            required
            id="outlined-required"
            type="text"
            className="form-control"
            placeholder="Enter Video Title"
            value={title}
            ref={ref}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="search-row">
          <TextField
            label="Video URL"
            color="secondary"
            required
            id="vid_url"
            type="text"
            className="form-control"
            placeholder="Enter Video Title"
            value={url}
            ref={ref}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <AddButton />
   
    </Box>
  );
};

export default AddVideo;
