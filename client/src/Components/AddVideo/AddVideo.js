import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import FormTextField from "../FormTextField/FormTextField";
import moment from "moment";

const AddVideo = ({ setDrawerToggle, videos, setVideos }) => {
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

      fetch("/api", {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          url: newUrl,
          uploaded: uploadDateAndTime,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          newVideo.id = res.id;
          setVideos(videos.concat(newVideo));
          setDrawerToggle(false);
        });
    } else {
      alert("Invalid YouTube URL");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormTextField
          id={"title-input"}
          label={"Title"}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <FormTextField
          id={"url-input"}
          label={"Url"}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
          aria-label="submit"
          endIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </FormControl>
    </form>
  );
};

export default AddVideo;
