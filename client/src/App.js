import "./App.css";
import React, { useState } from "react";
import YouTubeData from "./Data/YouTubeData.json";
import YouTubeVideos from "./Components/YouTubeVideos";
import AddVideo from "./Components/AddVideo";
import Search from "./Components/Search";

const App = () => {
  // Search Video
  const [videos, setVideos] = useState(YouTubeData);
  const searchVideo = (elem) => {
    if (elem.target.value) {
      const result = YouTubeData.filter((video) =>
        video.title
          .toLocaleLowerCase()
          .includes(elem.target.value.toLocaleLowerCase())
      );
      setVideos(result);
    } else {
      setVideos(YouTubeData);
    }
  };

  // Delete Video  
  const deleteVideo = (e) => {
    // e.preventDefault();
    const updatedVideos = videos.filter((video) => video.id !== e);
    setVideos(updatedVideos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Search searchVideo={searchVideo} />
      <AddVideo />
      {videos.map((video) => (
        <YouTubeVideos
          key={video.id}
          id={video.id}
          title={video.title}
          url={video.url}
          rating={video.rating}
          deleteVideo={deleteVideo}
        />
      ))}
    </div>
  );
};

export default App;
