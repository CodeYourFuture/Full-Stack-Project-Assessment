import React, { useState } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import data from "./exampleresponse.json";
import Search from "./components/Search";


const App = () => {
  const [videoData, setVideoData] = useState(data);
  const [search, setSearch] = useState("");
  const searchingData = videoData.filter((video) =>
    video.title.toUpperCase().includes(search.toUpperCase())
  );
  return (
    <div className="App">
      <header className="card text-white bg-info mt-2 pt-2" style={{ height: '80px' }} >
        <h1>Video Recommendation</h1>
      </header>
      <Search setSearch={setSearch} search={search} />
      <VideoCard videoData={videoData} searchingData={searchingData}/>
    </div>
  );
}

export default App;
