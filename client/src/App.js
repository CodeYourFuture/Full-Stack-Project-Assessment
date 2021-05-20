import "./App.css";
import React, { useState } from "react";
import YouTubeData from "./Data/YouTubeData.json";
import YouTubeVideos from "./Components/YouTubeVideos";
import AddVideo from "./Components/AddVideo";
import Search from "./Components/Search";

const App = () => {
  const [videos, setVideos] = useState(YouTubeData);

  // Search Video
  const searchVideo = (elem) => {
    if (elem.target.value) {
      const result = videos.filter((video) =>
        video.title
          .toLocaleLowerCase()
          .includes(elem.target.value.toLocaleLowerCase())
      );
      setVideos(result);
    } else {
      setVideos(YouTubeData);
    }
  };

  // Add Video
  const addVideo = (newVideo) => {
    setVideos(oldVideo => {
      return [newVideo, ...oldVideo];}
    )};

  // Delete Video
  const deleteVideo = (e) => {
    const updatedVideos = videos.filter((video) => video.id !== e);
    setVideos(updatedVideos);
  };

  return (
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
        </header>
        <Search searchVideo={searchVideo} />
        <AddVideo addVid={addVideo} />
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
