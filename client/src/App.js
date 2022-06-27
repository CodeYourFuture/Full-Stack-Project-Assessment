import React, { useState} from "react";
import "./App.css";
import videosData from "./exampleresponse.json"
import VideoCard from "./VideoCard";
import AddVideo from "./AddVideo";



function App() {
 const [videos, setVideos] = useState(videosData);
 const [addTitle, setAddTitle] = useState('');
 const [addUrl, setAddUrl] = useState('');
 let [addedVideos, setAddedVideos] = useState({});

 function addVideoTitle(e) {
   e.preventDefault()
   setAddTitle(e.target.value);
 }

 function addVideoUrl(e) {
  e.preventDefault()
  setAddUrl(e.target.value);
 }

 function addVideo(e) {
  e.preventDefault();
  addedVideos.title = addVideoTitle;
  addedVideos.url = addVideoUrl;

  let newData= videos.concat(addedVideos)
  setVideos(newData);
 }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <AddVideo videosData={videosData} placeholder="Enter a video name..." />
      <VideoCard  />
      
    </div>
  );
}

export default App;
