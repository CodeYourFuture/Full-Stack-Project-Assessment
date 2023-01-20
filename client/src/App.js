import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import videos from "./exampleresponse.json";
import AddVideo from "./AddVideo";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [videoList, setVideoList] = useState(videos);

  function handleDelete(id) {
    let filteredVideos = videoList.filter((video) => video.id !== id);
    setVideoList(filteredVideos);
  }

  function handleAdd(newVideo) {
    setVideoList([
      ...videoList,
      {
        ...newVideo,
        id: uuidv4(),
        rating: 0,
        date: new Date().toLocaleString(),
      },
    ]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="video-List">
          {videoList
            .sort((a, b) => b.rating - a.rating)
            .map((video, key) => (
              <Video video={video} key={key} handleDelete={handleDelete} />
            ))}
        </div>
        <div className="add-Video">
          <AddVideo onAdd={handleAdd} />
        </div>
      </body>
    </div>
  );
}

export default App;
