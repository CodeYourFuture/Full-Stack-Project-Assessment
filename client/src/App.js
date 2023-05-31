import "./App.css";
import VideoCards from "./VideoCards";
import Header from "./Header";
// import listOfVideos from "./exampleresponse.json";
import { useState, useEffect } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  

  useEffect(() => {
    fetch(
      `http://localhost:3001/`
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      });
  }, []);

  const handleListOfVideos = (id) => {
     const index = videos.findIndex((video) => video.id === id)
     if (index !== -1) {
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
      <Header videos={videos} setVideos={setVideos} />
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
