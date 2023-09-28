import React, { useState } from 'react';
import './App.css';
import videoData from "./components/exampleresponse.json";
import Video from "./components/Video";
import Links from "./components/Links";
import AddVideo from './components/AddVideo';


function App() {

  const [videos, setVideos] = React.useState ([]);

  fetch("http://127.0.0.1:5000/")
  .then((response) => response.json())
  .then(data => {setVideos(data)});

  const videoEl = videos.map((video) => {
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
      <AddVideo />
      <div>{videoEl}</div>
      <div>{youTubeLinks}</div>
    </div>
  );
};

export default App;