import React from "react";
import "./App.css";
import videoData from "./exampledata.json";
import Video from "./components/Video";

function App() {
  const [videos, setVideos] = React.useState(videoData);
  const videoElements = videos.map((video) => (
    <Video
      key={video.id}
      title={video.title}
      url={video.url}
      rating={video.rating}
      id={video.id}
      handleClickDelete={deleteVideo}
      handleClickAdd={ratingAdd}
      handleClickMinus={ratingMinus}
    />
  ));

  function deleteVideo(id) {
    setVideos((prevVideos) => {
      return prevVideos.filter((video) => {
        return video.id !== id;
      });
    });
  }

  function ratingAdd(id) {
    setVideos((prevVideos) => {
      return prevVideos.map((video) => {
        return video.id === id ? { ...video, rating: video.rating + 1 } : video;
      });
    });
  }

  function ratingMinus(id) {
    setVideos((prevVideos) => {
      return prevVideos.map((video) => {
        return video.id === id ? { ...video, rating: video.rating - 1 } : video;
      });
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="allVideoContainer">{videoElements}</div>
    </div>
  );
}

export default App;
