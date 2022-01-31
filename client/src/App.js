import React, { useState } from "react";
import "./App.css";
import AddVideo from "./AddVideo";
import Jumbotron from "./Jumbotron";
// // import VideoList from "./VideoList";
import VideoCard from "./VideoCard";
import Footer from "./Footer";
import StartingVideos from "./component/data/soulsongs.json";

function App() {
  const [videos, setVideos] = useState(StartingVideos);

  //remove video function using unique video id
  const removeVideo = (id) => {
    const videosUpdate = videos.filter((video) => video.id !== id);
    setVideos(videosUpdate);
  };

  return (
    <div className="App">
      <Jumbotron />
      <AddVideo state={videos} stateUpdate={setVideos} />
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
