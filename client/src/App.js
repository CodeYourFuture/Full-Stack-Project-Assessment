import "./App.css";
import exampleResource from "./exampleResponse.json";
import { useState } from "react";
import Video from "./Video";

function App() {
  const videoData = exampleResource;

  // delete video function
  function deleteVideo(event) {
    event.preventDefault();
    const target = event.target;
    const videoId = target.parentNode.parentNode.id;
    console.log(videoId);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <em>Video Recommendation</em>
        </h1>
      </header>
      <div className="videos-container">
        {videoData.map((video, index) => (
          /* video info holder div with unique sid  */
          <Video
            key={index}
            id={video.id}
            title={video.title}
            url={video.url}
            deleteVideo={deleteVideo}
            rating={video.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
