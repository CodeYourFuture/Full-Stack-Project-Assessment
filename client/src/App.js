import React, { useState } from "react";
import videos from "./exampleresponse.json";
import Box from "@mui/material/Box";
import VideosGrid from "./components/VideosGrid";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";
import "./App.css";

function App() {
  const [videosData, setVideosData] = useState(formatVideosUrl(videos));
  const [open, setOpen] = useState(false);
  const [videoData, setVideoData] = useState({
    id: null,
    title: "",
    url: "",
    rating: 0,
  });

  function formatVideosUrl(videos) {
    const formattedVideosData = videos.map((video) => {
      video.url = video.url.replace("watch?v=", "embed/");
      return video;
    });
    return formattedVideosData;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const updatedVideoData = {
      ...videoData,
      [e.target.name]: e.target.value,
    };
    setVideoData(updatedVideoData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVideosData(formatVideosUrl([...videosData, videoData]));
    setOpen(false);
    console.log({ videoData, videosData });
  };

  return (
    <div className="App">
      <Box>
        <Header />
        <AddVideoForm
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          open={open}
        />
        <VideosGrid videosData={videosData} />
      </Box>
    </div>
  );
}

export default App;
