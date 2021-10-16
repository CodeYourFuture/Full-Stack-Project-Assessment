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
  const [orderBy, setOrderBy] = useState("asc");
  const [isAsc, setIsAsc] = useState(false);

  const searchingData = videoData.filter((video) =>
    video.title.toUpperCase().includes(search.toUpperCase())
  );
  const handleSort = (isAsc) => {
    const sorted = isAsc ? "asc" : "desc";
    setOrderBy(sorted);
  };
  const toggleButton = () => {
    setIsAsc(!isAsc);
    handleSort(isAsc);
  };
  useEffect(() => {
    orderBy
      ? fetch(`http://127.0.0.1:5000/?order=${orderBy}`)
      : fetch(`http://127.0.0.1:5000`)
          .then((res) => res.json())
          .then((videoData) => setVideoData(videoData))
          .catch((err) => console.log(err));
  }, [orderBy]);

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
        toggleButton={toggleButton}
      />
    </div>
  );
}

export default App;
