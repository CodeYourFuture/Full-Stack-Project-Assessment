import React, { useState, useEffect } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
// import data from "./exampleresponse.json";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const newFilter = videoData.filter((value) =>
    value.title.toLowerCase().includes(searchQuery)
  );

  useEffect(() => {
    fetch(`http://localhost:5000?`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonResponse) => setVideoData(jsonResponse));
  }, []);

  return (
    <div className="App">
      <Header videoData={videoData} setVideoData={setVideoData} />
      <Search setSearchQuery={setSearchQuery} />
      <VideoCard videoData={newFilter} setVideoData={setVideoData} />
    </div>
  );
};

export default App;
