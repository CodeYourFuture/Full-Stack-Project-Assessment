import React, { useEffect, useState } from 'react';
import videos from './data/exampleresponse.json';
import VideoCardContainer from './components/VideoCardContainer';
import Header from './components/headerComponents/Header';

function App() {
  const [videosArr, setVideosArr] = useState([]);
  const sortedVideosByRating = () => videos.sort((vidA, vidB) => vidA.rating - vidB.rating).reverse();

  useEffect(() => {
    setVideosArr(sortedVideosByRating());
  }, []);
  
  return (
    <div>
      <Header />
      <VideoCardContainer videosArr={videosArr} setVideosArr={setVideosArr}/>
    </div>
  );
}

export default App;
