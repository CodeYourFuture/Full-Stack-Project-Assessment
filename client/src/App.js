import "./App.css";

import ExampleVideos from "./data/exampleresponse.json";

import React, { useState } from "react";
import Search from "./components/Search";
import VideoGrid from "./components/VideoGrid";
import AddVideoButton from "./components/AddVideoButton";
import AddVideoForm from "./components/AddVideoForm";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [videoList, setVideoList] = useState(ExampleVideos);
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);

  const extractVideoId = (videoUrl) => {
    const regex = /(?<=v=|v\/|vi=|vi\/|youtu\.be\/)[a-zA-Z0-9_-]{11}/g;
    const videoId = videoUrl.match(regex);
    return videoId;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>
      <AddVideoButton
        showAddVideoForm={showAddVideoForm}
        setShowAddVideoForm={setShowAddVideoForm}
      />
      <AddVideoForm
        showAddVideoForm={showAddVideoForm}
        extractVideoId={extractVideoId}
        videoList={videoList}
        setVideoList={setVideoList}
      />
      <VideoGrid
        searchValue={searchValue}
        videoList={videoList}
        setVideoList={setVideoList}
        extractVideoId={extractVideoId}
      />
    </div>
  );
}

export default App;
