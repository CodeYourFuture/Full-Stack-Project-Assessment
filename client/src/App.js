import "./App.css";
import React, { useEffect, useState } from 'react';
import videos from './data/exampleresponse.json';
import VideoCardContainer from './components/VideoCardContainer';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [videosArr, setVideosArr] = useState([]);
  const sortedVideosByRating = () => videos.sort((vidA, vidB) => vidA.rating - vidB.rating).reverse();

  useEffect(() => {
    setVideosArr(sortedVideosByRating());
  }, []);
  
  return (
    <ChakraProvider>
      <VideoCardContainer videosArr={videosArr} setVideosArr={setVideosArr}/>
    </ChakraProvider>
  );
}

export default App;
