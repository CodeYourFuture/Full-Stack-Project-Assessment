import { useState } from "react";
import "./App.css";
import YouTubeVideoAdder from "./components/VideoAdder";
import YouTubeVideosContainer from "./components/VideoCards";
import youTubeVideos from "./data/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(youTubeVideos);

  // EVENT HANDLERS
  const addNewVideo = ({ title, url }) => {
    const newVideo = { id: videos.length, title, url };
    setVideos([...videos, newVideo]);
  };

  const deleteVideo = (videoId) => {
    const index = videos.findIndex((v) => v.id === videoId);
    videos.splice(index, 1);
    setVideos([...videos]);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        <YouTubeVideoAdder onAdd={addNewVideo} />
        <YouTubeVideosContainer content={videos} onDelete={deleteVideo} />
      </div>
    </div>
  );
}

export default App;
