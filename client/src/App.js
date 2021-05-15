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
    console.log(newVideo)
    setVideos([...videos, newVideo]);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        <YouTubeVideoAdder onAdd={addNewVideo} />
        <YouTubeVideosContainer content={videos}/>
      </div>
    </div>
  );
}

export default App;
