import React, { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import Jumbotron from "./Jumbotron";
import VideoCard from "./VideoCard";
import OrderButton from "./OrderButton";
import Footer from "./Footer";
// import StartingVideos from "./component/data/soulsongs.json";

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  //remove video function using unique video id
  const removeVideo = (id) => {
    const videosUpdate = videos.filter((video) => video.id !== id);
    setVideos(videosUpdate);
  };

  return (
    <div className="App">
      <Jumbotron />
      <AddVideo state={videos} stateUpdate={setVideos} />
      <OrderButton/>
      <div className="video-list">
        {videos.map((video, index) => {
          return <VideoCard key={index} video={video} remover={removeVideo} />;
        })}
      </div>

      <Footer />
    </div>
  );
}

export default App;
