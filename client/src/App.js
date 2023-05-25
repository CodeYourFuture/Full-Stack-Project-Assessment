import "./App.css";
import React, { useState } from "react";
import data from './data';
import Video from './Video';
import AddVideo from "./AddVideo";

function App() {

const [videos, setVideos] = useState(data);

function handleRemoveVideo(id) {
  setVideos(videos.filter((video) => video.id !== id));
}

function handleUpVote(id) {
  setVideos(
    videos.map((video) => {
      if (video.id === id) {
        return { ...video, rating: video.rating + 1 };
      }
      return video;
    })
  );
}

function handleDownVote(id) {
  setVideos(
    videos.map((video) => {
      if (video.id === id) {
        return { ...video, rating: Math.max(0, video.rating - 1) };
      }
      return video;
    })
  );
}

function handleAddVideo(video) {
  setVideos([...videos, { id:videos.length +1, ...video }]);
}

  return (
    <>
    <div className="App-header">
      <h1>Video Recommendation</h1>
      <AddVideo onAdd={handleAddVideo} />
    </div>
    <div className ="App">  
      {videos.map((video) => (
        <Video
        key={video.id}
        video={video}
        onRemove={() => handleRemoveVideo(video.id)}
        onUpVote={() => handleUpVote(video.id)}
        onDownVote={() => handleDownVote(video.id)}
        />
        ))}
        {/* <header className="App-header">
          <h1>Video Recommendation</h1>
        </header> */}
      </div>
      </>
  );
}

export default App;
