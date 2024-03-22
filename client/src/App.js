import React, { useState, useEffect } from 'react';
import './App.css';
import Video from "./components/Video";
import Links from "./components/Links";
import AddVideo from './components/AddVideo';

function App() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const videoEl = videos
    .filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((video) => (
      <Video
        key={video.id} 
        name={video.title}
        link={video.url}
        rating={video.rating}
        AddRating={AddRating}
        downRating={minusRating}
        deleteVideo={deleteVideo}
      />
    ));

  const youTubeLinks = videos.map((video) => (
    <Links key={video.id} link={video.url} />
  ));

  function AddRating(videoTitle, currentRating) {
    const updatedVid = videos.map((video) => (
      video.title === videoTitle ? {...video, rating: currentRating + 1} : video
    ));
    setVideos(updatedVid);
    fetch(`http://127.0.0.1:5000/${videoTitle}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ rating: currentRating + 1 }),
    })
    .then((response) => {
      if (!response.ok) throw new Error('Failed');
    })
    .catch((error) => console.error(error));
  }

  function deleteVideo(videoTitle) {
    const updatedVideos = videos.filter((video) => video.title !== videoTitle);
    setVideos(updatedVideos);

    fetch(`http://127.0.0.1:5000/${videoTitle}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) throw new Error('Failed to delete');
    })
    .catch((error) => console.error(error));
  }

  function minusRating(videoTitle) {
    const updatedVid = videos.map((video) => (
      video.title === videoTitle ? {...video, rating: Math.max(0, video.rating - 1)} : video
    ));
    setVideos(updatedVid);
  }

  function addNewVideo(newVideo) {
    setVideos([...videos, newVideo]);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo addVideo={addNewVideo} handleSearch={handleSearch} />
      <div>{videoEl}</div>
      <div>{youTubeLinks}</div>
    </div>
  );
}

export default App;