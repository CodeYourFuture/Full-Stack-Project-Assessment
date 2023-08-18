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
    console.log(`deleting video with id of ${id}`);
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
