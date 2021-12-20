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

  const [isAsc, setIsAsc] = useState(false);

  const searchingData = videoData.filter((video) =>
    video.title.toUpperCase().includes(search.toUpperCase())
  );

  const toggleButton = () => {
    setIsAsc(!isAsc);
  };
  console.log("Hello");

  useEffect(() => {
    const url = `http://127.0.0.1:5000/?order=${isAsc ? "asc" : "desc"}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((videoData) => {
        setVideoData(videoData);
        console.log(videoData);
      })
      .catch((err) => console.log(err));
  }, [isAsc]);

  return (
    <div className="App ">
      <div className="addSearch row">
        <div className="d-flex-- col-md-6">
          <AddVideo videoData={videoData} setVideoData={setVideoData} />
          <div>
            <h1>AdemTube</h1>
            <Search setSearch={setSearch} search={search} />
          </div>
        </div>
      </div>
      <div className="videos row--">
        <div className="d-flex-- col-md-3">
          <Videos
            searchingData={searchingData}
            videoData={videoData}
            setVideoData={setVideoData}
            toggleButton={toggleButton}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
