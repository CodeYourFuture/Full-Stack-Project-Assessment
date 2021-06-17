import React, { useState } from 'react';
import videos from './data/exampleresponse.json';
import VideoCardContainer from './components/VideoCardContainer';
import Header from './components/headerComponents/Header';

function App() {
  const [videosArr, setVideosArr] = useState(videos);

  return (
    <div>
      <Header setVideosArr={setVideosArr} videosArr={videosArr} />
      <VideoCardContainer videosArr={videosArr} setVideosArr={setVideosArr} />
    </div>
  );
}

export default App;
