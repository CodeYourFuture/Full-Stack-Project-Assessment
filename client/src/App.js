import "./App.css";

import ExampleVideos from "./data/exampleresponse.json";

import React, { useState } from "react";
import Search from "./components/Search";
import VideoGrid from "./components/VideoGrid";
import AddVideoButton from "./components/AddVideoButton";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [videoList, setVideoList] = useState(ExampleVideos);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </header>
      <AddVideoButton />
      <VideoGrid videoList={videoList} />
    </div>
  );
}

export default App;
