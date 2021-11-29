// import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import VideoPlayer from "./components/VideoPlayer";
import data from "./videoData.json";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <VideoPlayer data={data} />
    </div>
  );
}

export default App;
