import React, { useState, useEffect } from 'react';
import "./App.css";
import Video from './Video'; 
import AddVideo from './AddVideo';
import axios from 'axios'; // Import Axios

function App() {
  const [videos, setVideos] = useState([]); 

  useEffect(() => {
    // Use Axios to make the GET request
    axios.get("http://localhost:4000")
      .then((response) => {
        setVideos(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, []);

  const handleAdd = (newVideo) => {
    setVideos([...videos, newVideo]);
  };

  const handleRemove = (videoId) => {
    const updatedVideos = videos.filter(video => video.id !== videoId);
    setVideos(updatedVideos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>BEKIR's Video Recommendations</h1>
      </header>
      <AddVideo onAdd={handleAdd} />
      {videos.map(video => (
        <Video key={video.id} video={video} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export default App;
