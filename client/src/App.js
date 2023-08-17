import "./App.css";
import React, { useState } from "react";
import videoData from "./exampleresponse.json";
import VideoList from "./components/VideoList";
import AddVideoForm from "./components/AddVideoForm";
import Searchbar from "./components/Searchbar";

function App() {
  const [videos, setVideos] = useState(videoData);

  function changeVoteScore(id) {
    return function (voteChoice) {
      setVideos((videos) =>
        videos.map((video) => {
          const newVideo = { ...video };
          if (video.id === id) {
            newVideo.rating = video.rating + voteChoice;
          }

          return newVideo;
        })
      );
    };
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendations</h1>
      </header>
      <div>
        <AddVideoForm />
        <Searchbar />
      </div>
      <div className="video--container">
        <VideoList videos={videos} changeVoteScore={changeVoteScore} />
      </div>
    </div>
  );
}

export default App;
