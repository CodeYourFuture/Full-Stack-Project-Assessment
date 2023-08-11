import React, { useState } from "react";
import "./App.css";
import exampleData from "./exampleresponse.json";
import Video from "./components/Video";
import AddVideo from "./components/AddVideo";

function App() {
  const [videos, setVideos] = useState(exampleData);

  const handleDelete = (videoToDelete) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoToDelete.id)
    );
  };

  const handleUpVote = (videoToUpVote) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoToUpVote.id
          ? { ...video, rating: video.rating + 1 }
          : video
      )
    );
  };

  const handleDownVote = (videoToDownVote) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoToDownVote.id
          ? { ...video, rating: video.rating - 1 }
          : video
      )
    );
  };

  const handleAddVideo = (video) => {
    const newVideo = { ...video, id: Date.now() };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };
  return (
    <div className="App container">
      <header className="App-header mb-3">
        {" "}
        <h1>Video Recommendation</h1>
      </header>
      <div className="mb-3">
        {" "}
        <AddVideo onAdd={handleAddVideo} />
      </div>
      <div className="row">
        {" "}
        {videos.map((video) => (
          <Video
            key={video.id}
            video={video}
            onDelete={handleDelete}
            onUpVote={handleUpVote}
            onDownVote={handleDownVote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
