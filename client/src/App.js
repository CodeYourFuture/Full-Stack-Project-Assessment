import React from "react";
import videos from "./exampleresponse.json";
import Video from "./Video";
import "./App.css";

const App = () => {
  return (
    <div className="main-container">
      <h1>video Recomendation</h1>

      <div className="video-container">
        {videos.map((video) => {
          let url = video.url.split("v=")[1];
          return <Video title={video.title} rating={video.rating} url={url} />;
        })}
      </div>
    </div>
  );
};

export default App;
