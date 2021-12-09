import React from "react";
import "./App.css";
import Addbtn from "./components/Addbtn";
import Videos from "./components/Videos";


function App() {


  // function addNewVideo(title, url) {
  //   const newVideos = [...videos, { id: videos.length, title, url, rating: 0 }];

  //   setVideos(newVideos);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Addbtn />
        <Videos />
      </header>
    </div>
  );
}

export default App;
