import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddVideo from "./components/AddVideo";
import Search from "./components/Search";
import Videos from "./components/Videos";
// import data from "./exampleresponse.json";

function App() {
  const [videoData, setVideoData] = useState([]);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [sorted, setSorted] = useState(false);

  const handleSort = () => {
    setSorted(!sorted);
  };

  const sortedVideoData = videoData.sort((video1, video2) => {
    if (sorted) {
      return video1.rating > video2.rating ? 1 : -1;
    } else {
      return video1.rating < video2.rating ? 1 : -1;
    }
  });
  const searchingData = videoData.filter((video) =>
    video.title.toUpperCase().includes(search.toUpperCase())
  );
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/?order=${orderBy}`)
      .then((res) => res.json())
      .then((sortedVideoData) => setVideoData(sortedVideoData))
      // .then((videoData) => console.log(videoData));
      .catch((err) => console.log(err));
  }, [orderBy]);

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
        handleSort={handleSort}
      />
    </div>
  );
}

export default App;
