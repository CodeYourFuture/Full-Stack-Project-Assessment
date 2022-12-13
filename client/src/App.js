import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideos from "./AddVideos";

function App() {
  const [videoData, setVideoData] = useState(dataVideos);

  const deleteVideos = (id) => {
    setVideoData((videoData) => videoData.filter((data) => data.id !== id));
  };

  const addVideos = (vidInfo) => {
    setVideoData((videoData) => videoData.concat(vidInfo));
    console.log(videoData);
  };

  const updateRatings = (id, likes) => {
    setVideoData((videoData) =>
      videoData.map((el) => {
        if (el.id === id) {
          el.rating = likes;
        }
        return el;
      })
    );
    console.log(videoData)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <section>
          <AddVideos addVideos={addVideos} />
        </section>
        <section className="videoDisplay">
          {videoData.map((video) => (
            <Video
              video={video}
              key={video.id}
              deleteVideos={deleteVideos}
              updateRatings={updateRatings}
            />
          ))}
        </section>
      </body>
    </div>
  );
}

export default App;
