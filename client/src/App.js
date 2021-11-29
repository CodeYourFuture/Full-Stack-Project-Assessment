import React, { useState } from 'react';
import "./App.css";
import Header from './components/Header';
import videosData from "./exampleresponse.json";
import AllVideoCards from './components/AllVideoCards';



function App() {
  const [videos, setVideos] = useState(videosData);
 
  return (
    <div className="App">
      <Header videos={videos} setVideos={setVideos} videosData={videosData} />
      <AllVideoCards videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default App;
