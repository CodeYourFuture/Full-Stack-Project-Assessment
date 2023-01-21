import React, {useState} from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideo from "./AddVideo";
import SearchBar from "./SearchBar";



function App() {
  const [videos, setvideos] = useState(dataVideos)
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div>
          <AddVideo />
        </div>
        <div><SearchBar /></div>
        {videos.map((video, key) => (
          <Video video={video} key={key} setvideos={setvideos} videos={videos}/>
        ))}
      </body>
    </div>
  );
}

export default App;
