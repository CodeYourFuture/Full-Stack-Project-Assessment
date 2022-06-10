import React, { useState, useEffect } from "react";
import "./App.css";
import videoData from "././data/exampleresponse.json";
import Header from "./components/Header";
import YouTubeVideoList from "./components/YouTubeVideoList";
import FormAddVideo from "./components/FormAddVideo";

function App() {
  const [youtubeVideos, setYouTubeVideos] = useState(videoData);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setYouTubeVideos(youtubeVideos);
  }, [youtubeVideos, title, url]);

  const handleRemoveVideo = (id) => {
    setYouTubeVideos(youtubeVideos.filter((item) => item.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let createVideo = {
      id: Math.floor(Math.random() * 100),
      title,
      url,
      rating: 0,
    };

    setYouTubeVideos([...youtubeVideos, createVideo]);
  };

  const handleCancel = () => {
    setTitle("");
    setUrl("");
  };

  return (
    <div className="main-container">
      <Header />
      <YouTubeVideoList
        videos={youtubeVideos}
        handleClick={handleRemoveVideo}
      />
      <FormAddVideo
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        addTitle={title}
        addUrl={url}
        setTitle={setTitle}
        setUrl={setUrl}
      />
    </div>
  );
}

export default App;
