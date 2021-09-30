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

  const [sorted, setSorted] = useState(false);

  const sortedVideoData = videoData.sort(
    (video1, video2) => video2.rating - video1.rating
  );
  const searchingData = sortedVideoData.filter((video) =>
    video.title.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="videoSearch d-flex mx-5">
        <AddVideo
          sortedVideoData={sortedVideoData}
          setVideoData={setVideoData}
        />
        <Search setSearch={setSearch} search={search} />
      </div>

      <Videos
        searchingData={searchingData}
        sortedVideoData={sortedVideoData}
        setVideoData={setVideoData}
      />
    </div>
  );
}

export default App;
