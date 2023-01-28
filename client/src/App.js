import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Components/Video";
import AddVideoBtn from "./Buttons/AddVideoBtn";

function App() {
  const [videos, setVideos] = useState([]);
  function handleDelete(id) {
    let filterVideos = videos.filter((video) => video.id !== id);
    setVideos(filterVideos);
  }
  function addNewVideo(newVideo) {
    const allVideo = videos.concat(newVideo);
    setVideos(allVideo);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideoBtn addNewVideoFunction={addNewVideo} />
      <div className="container-fluid">
        {videos.map((video, key) => (
          <Video video={video} key={key} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
export default App;
