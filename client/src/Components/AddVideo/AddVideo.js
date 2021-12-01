import React, { useState } from "react";
import { TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import moment from "moment";

const AddVideo = ({ toggleDrawer, videos, setVideos }) => {
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const youTubeURLRegex =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    if (newUrl.match(youTubeURLRegex)) {
      let uploadDateAndTime = moment().format("MMMM Do YYYY, h:mm:ss a");

      const newVideo = {
        id: 0,
        title: newTitle,
        url: newUrl,
        rating: 0,
        uploaded: uploadDateAndTime,
      };

      console.log(newVideo);

      fetch("http://localhost:5000", {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          url: newUrl,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          newVideo.id = res.id;
          setVideos(videos.concat(newVideo));
          toggleDrawer(false);
        });
    } else {
      console.log("Notmatch");
    }
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
