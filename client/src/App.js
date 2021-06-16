import "./App.css";
import React from 'react';
import videos from './data/exampleresponse.json';
import VideoCardContainer from './components/VideoCardContainer';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <VideoCardContainer videos={videos} />
    </ChakraProvider>
  );
}

export default App;
