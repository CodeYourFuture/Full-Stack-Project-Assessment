import React, { useState } from "react";
// import ReactDOM from "react-dom";
import "./App.css";
// import video from "./singleVideo.json";
import defaultVideoData from "./exampleresponse.json";
import AddNewVideo from "./AddNewVideo";
import SearchVideo from "./SearchVideo";
import PopulateVideos from "./PopulateVideos";

function App() {
  const [videoData, setVideoData] = useState(defaultVideoData);
  // const [title, setTitle] = useState("");
  // const [url, setUrl] = useState('');
  // const [rating, setRating] = useState(0);
  return (
    <div className="App">
      <header className="my-App-header">
        <h1>Video Recommendation</h1>
      </header>
      
        <AddNewVideo videoData={videoData} setVideoData={setVideoData} />
        <hr className="hr"></hr>
        <SearchVideo />
        <PopulateVideos defaultVideoData={defaultVideoData} setDefaultVideoData={setVideoData}/>
      
    </div>
  );
}

export default App;
