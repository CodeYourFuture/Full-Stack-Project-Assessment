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
      handleClick={deleteVideo}
    />
  ));

  function deleteVideo(id) {
    setVideos((prevVideos) => {
      return prevVideos.filter((video) => {
        return video.id !== id;
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
