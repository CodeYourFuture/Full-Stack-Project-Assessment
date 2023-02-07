import { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./components/AddVideo";
import VideosContainer from "./components/VideosContainer";
import videosData from "./data/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getVideos() {
      setVideos([...videosData]);
    }

    getVideos();
  }, []);

  const addVideo = (video) => {
    console.log(video);
    setVideos([...videos, video]);
  }

  const deleteVideo = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  }

  const incRating = (id) => {
    setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating + 1 }));
  }

  const decRating = (id, rating) => {
    if (rating > 0) {
      setVideos(videos.map(video => video.id !== id ? video : { ...video, rating: video.rating - 1 }));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addVideo} />
      <VideosContainer videos={videos} deleteVideo={deleteVideo} incRating={incRating} decRating={decRating} />
    </div>
  );
}

export default App;
