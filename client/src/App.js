import "./App.css";
import React, { useState } from "react";
import YouTubeData from "./Data/YouTubeData.json";
import YouTubeVideos from "./Components/YouTubeVideos";
import AddVideo from "./Components/AddVideo";
import Search from "./Components/Search";

const App = () => {
  // Search Video
  const [videoSearched, setVideoSearched] = useState(YouTubeData);
  const searchVideo = (elem) => {
    if (elem.target.value) {
      const result = YouTubeData.filter((video) =>
        video.title
          .toLocaleLowerCase()
          .includes(elem.target.value.toLocaleLowerCase())
      );
      setVideoSearched(result);
    } else {
      setVideoSearched(YouTubeData);
    }
  };

  function test(videoSearched) {
    console.log(videoSearched);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <Search searchVideo={searchVideo} />
      <AddVideo />
      {videoSearched.map((video) => (
        <YouTubeVideos
          key={video.id}
          title={video.title}
          url={video.url}
          rating={video.rating}
          test={test(video.id)}
        />
      ))}
    </div>
  );
};

export default App;
