import "./App.css";
import React, { useState } from "react";
import videoData from "./exampleresponse.json";
import VideoList from "./components/VideoList";
import AddVideoForm from "./components/AddVideoForm";
import Searchbar from "./components/Searchbar";

function App() {
  const [videos, setVideos] = useState(videoData);

  function changeVoteScore(id, voteChoice) {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            rating: video.rating + voteChoice,
          };
        }

        return video;
      })
    );
  }

  function deleteVideo(id) {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  }

  function addVideo() {
    // setVideos((prevVideos) => {
    //   console.log("video added")
    //   prevVideos.map((video) =>)
    // });
    console.log("video added");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendations</h1>
      </header>
      <div>
        <AddVideoForm handleAddVideo={addVideo} />
        <Searchbar />
      </div>
      <div className="video--container">
        <VideoList
          videos={videos}
          handleVote={changeVoteScore}
          handleDelete={deleteVideo}
        />
      </div>
    </div>
  );
}

export default App;
