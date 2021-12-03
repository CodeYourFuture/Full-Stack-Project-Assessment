// import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import VideoPlayer from "./components/VideoPlayer";
import data from "./videoData.json";
import { useState } from "react";
import AddVideoModal from "./components/AddVideoModal";

function App() {
  const [videos, setVideos] = useState(data);
  const [showAddVideos, setShowAddVideos] = useState(false);
  console.log("data", data);

  const handleClose = () => {
    setShowAddVideos(false);
  };

  return (
    <div className="App">
      {showAddVideos && (
        <AddVideoModal handleClose={handleClose}></AddVideoModal>
      )}

      <Header />
      <div className="modal-button">
        <button
          onClick={() => setShowAddVideos(true)}
          type="button"
          class="btn btn-warning p-1 m-3"
        >
          Add Video
        </button>
      </div>
      <SearchBar videos={videos} setVideos={setVideos} />
      <VideoPlayer videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
