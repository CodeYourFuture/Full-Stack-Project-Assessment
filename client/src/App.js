import React, { useState } from "react";
import "./App.css";
import videoImport from "./exampleresponse.json";
import Video from "./Video.js";
import AddVid from "./AddVid.js";

function App() {
  const [del, setDel] = useState(videoImport);

  const removeVid = (id) => {
    let newVids = del.filter((el) => el.id !== id);
    setDel(newVids);
  };

  // const newVideoData = (newVid) => {};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>
        <AddVid />
      </div>
      <body>
        {/* {videoImport.map((video, index) => (
          <Video index={index} video={video} />
        ))} */}
        {del.map((video, index) => (
          <Video removeVid={removeVid} index={index} video={video} />
        ))}
      </body>
    </div>
  );
}

export default App;
