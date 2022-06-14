
  
import React, { useState } from "react";
import "./App.css";
import RenderVideos from "./RenderVideos";
import NewVideos from "./NewVideos";
import data from "./exampleResponse.json";


function App() {
 
  const [allVideos, setAllVideos] = useState(data);
  const [visible, setVisible] = useState(false);

  // A function to delete a video
  const deleteVideos = (arrVideo) => {
    setAllVideos((videos) => {
      return videos.filter((v) => {
        return v.id !== arrVideo.id;
      });
    });
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Video Channel </h1>
      </header>
      <h2 className="add-video-title" onClick={()=>setVisible(true)}>
        Add Video
      </h2>
<div className="container">
      { visible && <NewVideos
        myAllVideos={allVideos}
        setAllVideos={setAllVideos}
        setVisible={setVisible}
      />}

      {allVideos.map((video) => (
        <RenderVideos
          key={video.id}
          video={video}
          deleteVideos={deleteVideos}
        />
      ))}
      </div>
    </div>
  );
}

export default App;