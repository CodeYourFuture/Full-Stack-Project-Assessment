import "./App.css";
import VideoCards from "./VideoCards";
import Header from "./Header";
import listOfVideos from "./exampleresponse.json";
import { useState } from "react";

function App() {
  const [videos, setVideos] = useState(listOfVideos);
  
  const handleListOfVideos = (id) => {
     const index = videos.findIndex((video) => video.id == id)
     if (index !== -1) {
      // Create a new array without the deleted card
      const updatedVideos = [...videos];
      updatedVideos.splice(index, 1);
      setVideos(updatedVideos);
     }
  }

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
            handleListOfVideos={handleListOfVideos}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
