import React, {useState, useEffect} from "react";
import "./App.css";
import Video from "./Video";
import VideoAdd from "./VideoAdd";

function App() {
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then(res => res.json())
      .then(data => setvideos(data))
      .catch(err => console.log(err));
  }, []);

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