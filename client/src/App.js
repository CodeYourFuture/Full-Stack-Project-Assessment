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
        videoList={videoList}
        setVideoList={setVideoList}
      />
      <VideoGrid videoList={videoList} setVideoList={setVideoList} />
    </div>
  );
}

export default App;
