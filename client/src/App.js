import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import sampleData from "./data/sampleData.json";
import AddVideos from "./components/AddVideos";


function App() {

  const [video, setVideo] = useState(sampleData)

  return (
    <div className="App">
      <Header />
      <AddVideos video={video} setVideo={setVideo} />
      <div id="container">
        <Cards video={video} setVideo={setVideo} />
      </div>
    </div>
  );
}

export default App;
