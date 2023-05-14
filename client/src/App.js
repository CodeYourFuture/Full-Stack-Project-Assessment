import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Video from "./components/Video";
import videos from "./exampleresponse.json";


function App() {
 console.log(videos)

  return (
    <div className="App">
      <Navbar />
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <div className="">
        {videos.map((video) => (
          <Video video={video}/>
        ))}
      </div>
    </div>
  );
}

export default App;
