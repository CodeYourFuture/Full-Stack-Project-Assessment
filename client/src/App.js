import React from 'react';
import "./App.css";
import data from "./exampleresponse.json";
import VideoCard from './components/VideoCard';

const App = () => {
  const firstVideo = data[0];
  return (
    <div className="text-left App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <VideoCard data={firstVideo}/>
    </div>
  );
}

export default App;
