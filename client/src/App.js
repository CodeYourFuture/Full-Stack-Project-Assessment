import "./App.css";
import VideoCards from "./VideoCards";
import Header from "./Header";
import listOfVideos from "./exampleresponse.json";
import { useState } from "react";

function App() {
  const [videos, setVideos] = useState(listOfVideos);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Header setVideos={setVideos} />
      <div className="cards">
        {videos.map((video) => (
          <VideoCards
            key={video.id}
            video={video}
            setVideos={setVideos}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
