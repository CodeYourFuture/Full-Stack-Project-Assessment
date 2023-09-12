import "./App.css";
import React, { useState, useEffect } from "react";
import Handlers from "./Handlers";



function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideosData  = async () => {
      try {

       const apiKey = process.env.REACT_APP_API_KEY;
       const res = await fetch('https://full-stack-back-end.onrender.com/');
       const data = await res.json();
       setVideos(data); 
      }
      catch (error) {
       console.log(error);
      }
   }
   fetchVideosData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h4>Video Recommendation</h4>
      </header>
      {videos.map(video => (
      <div key={video.id}>
        <h5>{video.title}</h5>
        <p>{video.url}</p>
        <p>Rating: {video.rating}</p>
      </div>
    ))}
      <Handlers />
    </div>
  );
}

export default App;
