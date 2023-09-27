import React, { useState } from 'react';
import './App.css';
//import VideosList from './VideosList';
import AddVideo from './AddVideo';

const App = () => {
  const [videos, setVideos] = useState([]); 

  const handleVote = (id, direction) => {
    
  };

  const handleRemove = id => {
    
  };

  const handleAddVideo = newVideo => {
   
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo handleAddVideo={handleAddVideo} />
      <VideosList
        videos={videos}
        handleVote={handleVote}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default App;