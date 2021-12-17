import React, { useState, useEffect } from "react";
import "./App.css";
//import data from "./exampleresponse.json";
import Header from "./components/Header";
import AddVideo from "./components/AddVideo";
import SearchBar from "./components/SearchBar";
import VideoCard from "./components/VideoCard";

const App = () => {
  const [videoData, setVideoData] = useState([]);

  const fetchVideoData = async () => {
    const url = "http://127.0.0.1:5000";
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const json = await response.json();
        setVideoData(json);
      } else {
        const json = response.json();
        alert(json.msg);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchVideoData();
  }, [videoData]);

  const handleDelete = (id) => {
    const filteredVideos = videoData.filter((video) => video.id !== id);
    setVideoData(filteredVideos);
  };
  return (
    <div className="App">
      <Header />
      <SearchBar videoData={videoData} setVideoData={setVideoData} />
      <AddVideo videoData={videoData} setVideoData={setVideoData} />
      <div className="card-group">
        {videoData.map((video, index) => (
          <VideoCard
            title={video.title}
            url={video.url}
            rating={video.rating}
            id={video.id}
            key={index}
            deleteCard={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
