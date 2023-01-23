import React, {useState} from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddAVideo from "./addAVideo";

function App() {
const [del, setDel] = useState([]);


   const newVideo = (video) => {
     setDel([...del, video]);
   };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div>
          <AddAVideo newVideo={newVideo} />
        </div>
        {dataVideos.map((video, key) => (
          <Video video={video} key={key} />
        ))}
      </body>
    </div>
  );
}

export default App;
