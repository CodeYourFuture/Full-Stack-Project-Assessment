import React, { useState } from "react";
// import "./App.css";
import Video from "./Video";
import AddVideo from "./AddVideo";
import videosData from "./exampleresponse.json";

function App() {
  const [videos, setVideos] = useState(videosData);

  const handleVote = (id, increment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, votes: video.votes + increment } : video
      )
    );
  };

  const handleRemove = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const handleAddVideo = (newVideo) => {
    const id = videos.length + 1;
    setVideos([...videos, { ...newVideo, id, votes: 0 }]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        {videos.map((video) => (
          <Video
            key={video.id}
            video={video}
            onVoteUp={() => handleVote(video.id, 1)}
            onVoteDown={() => handleVote(video.id, -1)}
            onRemove={() => handleRemove(video.id)}
          />
        ))}
        <AddVideo onAddVideo={handleAddVideo} />
      </header>
    </div>
  );
}

export default App;
