import React, { useState } from "react";
import "./App.css";
import RenderVideos from "./RenderVideos";
import NewVideos from "./NewVideos";
import data from "./exampleresponse.json";


function App() {
  const [allVideos, setAllVideos] = useState(data);

  // A function to delete a video
  const deleteVideos = (arrVideo) => {
    setAllVideos(
      allVideos.filter((v) => {
        return v !== arrVideo;
      })
    );
  };
 

  return (
    <div className="App">

      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <NewVideos myAllVideos={myAllVideos}/>
      
      {allVideos.map((video, i) => (
        <RenderVideos key={i} video={video} deleteVideos={deleteVideos} />
      ))}
    </div>
  );
}

export default App;
