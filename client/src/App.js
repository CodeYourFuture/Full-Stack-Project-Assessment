import { useEffect, useState } from "react";
import "./App.css";
import YouTubeVideoAdder from "./components/VideoAdder";
import YouTubeVideosContainer from "./components/VideoCards";
import { fetchVideoData, sortVideosByRating } from "./functions";

function App() {
  const [videos, setVideos] = useState([]);
  const API_LINK = `http://localhost:5000`;
  // FETCH VIDEO DATA
  useEffect(() => {
    fetchVideoData(API_LINK).then((data) =>
      setVideos(sortVideosByRating(data))
    );
  }, [API_LINK]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="container">
        <YouTubeVideoAdder />
        <YouTubeVideosContainer content={videos} />
      </div>
    </div>
  );
}

export default App;
