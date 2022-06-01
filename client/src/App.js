import React, { useState } from "react";
import SingleVideo from "./SingleVideo";
import example from "./exampleresponse.json";
import "./App.css";
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState(example);
  const [showAddVideo, setShowAddVideo] = useState(false)
  console.log(videos)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <main>
        <button onClick={() => setShowAddVideo(true)}>Add Video</button>
        {showAddVideo && <AddVideo setShowAddVideo={setShowAddVideo} setVideos={setVideos} videos={videos} />}
        {videos.map((video, index) => (
          <SingleVideo video={video} key={video.id} index={index} videos={videos} setVideos={setVideos} />
        ))}
      </main>
    </div>
  );
}

export default App;
