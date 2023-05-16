import React, { useState } from 'react';
import VideoComponent from './VideoComponent';
import data from './exampleresponse.json';

function App() {
  const [videos, setVideos] = useState(data);

  const handleRemove = (videoId) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };

  return (
    <div className="App">
      <header>
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((video) => (
        <VideoComponent key={video.id} video={video} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export default App;
