import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddVideo from "./components/AddVideo";
import Search from "./components/Search";
import Videos from "./components/Videos";
import data from "./exampleresponse.json";

function App() {
  const [videoData, setVideoData] = useState(data);
  const [search, setSearch] = useState("");

  const searchingData = videoData.filter((video) =>
    video.title.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="videoSearch d-flex mx-5">
        <AddVideo videoData={videoData} setVideoData={setVideoData} />
        <Search setSearch={setSearch} search={search} />
      </div>

      <Videos
        searchingData={searchingData}
        videoData={videoData}
        setVideoData={setVideoData}
      />
    </div>
  );
}

export default App;
