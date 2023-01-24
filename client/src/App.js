import React, {useState} from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import VideoAdd from "./VideoAdd";


function App() {
  const [videos, setvideos] = useState(dataVideos)
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>YouVideos</h1>
      </header>
      <body>
        <div>
          <VideoAdd setvideos={setvideos} videos={videos} />
        </div>
        {videos.map((video, key) => (
          <Video video={video} key={key} setvideos={setvideos} videos={videos}/>
        ))}
      </body>
    </div>
  );
}

export default App;