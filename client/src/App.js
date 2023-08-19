import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form";
import Video from "./Components/Video";
import Header from "./Components/Header";
import Data from "./Components/exampleresponse.json";

function App() {
  const [videos, setVideos] = useState([]);

  // Function to fetch videos from the server
  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://video-server-kddf.onrender.com/`
      );
      const data = await response.json();
      setVideos(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch videos when the page is loaded
    fetchVideos();
  }, []);

  // Update video list when videos prop changes
  useEffect(() => {
    if (Array.isArray(videos)) {
      setVideos(videos);
    } else {
      setVideos([]);
    }
  }, [videos]);


  const handleDelete = (id) => {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  };

   // Update video rating
   const updateVideoRating = (videoId, rating) => {
    const updatedVideos = videos.map(video =>  video.id === videoId ? { ...video, rating } : video);
    setVideos(updatedVideos);
  };


  const sortedVideos = useMemo(() => {
    // Sort videos based on rating
    return [...videos].sort((a, b) => b.rating - a.rating);
  }, [videos]); 


  return (
    <div className="App">
      <Header />
      <Form fetchVideos={fetchVideos} />
      <Video videos={sortedVideos} onDelete={handleDelete} updateVideoRating={updateVideoRating}/>
    </div>
  );
}

export default App;
