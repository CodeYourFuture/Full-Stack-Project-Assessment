import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideo from "./AddVideo";

function App() {
  const [videoData, setVideoData] = useState(dataVideos);

  const deleteVideo = (id) => {
    setVideoData((videoData) => videoData.filter((el) => el.id !== id));
  };

  const addVideo = (newVid) => {
    setVideoData((videoData) => videoData.concat(newVid));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <section>
          {videoData.map((video) => (
            <Video
              video={video}
              key={video.id}
              vidId={video.id}
              deleteVideo={deleteVideo}
            />
          ))}
        </section>
        <section>
          <h2>Add a New Video</h2>
          <AddVideo addVideo={addVideo} />
        </section>
      </body>
    </div>
  );
}

export default App;
