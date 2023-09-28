import React, { useState } from 'react';
import './App.css';
import videoData from "./components/exampleresponse.json";
import Video from "./components/Video";
import Links from "./components/Links";


function App() {

  const videoEl = videoData.map((video) => {
    return <Video name = {video.title} link = {video.url} rating = {video.rating}/>;
  });

  const youTubeLinks = videoData.map((video) => {
    return <Links link={video.url}/>
  });

  function AddRating() {
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>{videoEl}</div>
      <div>{youTubeLinks}</div>
    </div>
  );
};

export default App;