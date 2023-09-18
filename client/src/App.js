import "./App.css";
import React, { useState, useEffect } from "react";
import Handlers from "./Handlers";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        const response = await fetch("https://full-stack-back-end.onrender.com");
        if (!response.ok) {
          console.log("Failed to fetch data. Status code:", response.status);
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        const videosWithRating = data.map((video) => ({
          ...video,
          rating: video.rating || 0,
        }));
        setVideos(videosWithRating);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchVideosData();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h4>Video Recommendation</h4>
      </header>
      {videos.map(video => (
      <div key={video.id}>
        <h5>{video.title}</h5>
        <p>{video.url}</p>
        <p>{`rating: video.rating`}</p>
      </div>
    ))}
      <Handlers />
    </div>
  );
}

export default App;


