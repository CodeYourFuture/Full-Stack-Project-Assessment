import React, { useState } from "react";
import "./App.css";
import "./RenderVideos.css";
import RenderVideos from "./RenderVideos";
import NewVideos from "./NewVideos";
import data from "./exampleresponse.json";


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
        <h1>Video Recommendation</h1>
      </header>
      <h2 className="add-video-title" onClick={() => setVisible(true)}>
        Add Video
      </h2>

      {visible && (
        <NewVideos
          myAllVideos={allVideos}
          setAllVideos={setAllVideos}
          setVisible={setVisible}
        />
      )}
      <div class="container">
        <div class="row">
          {allVideos.map((video) => (
            <div class="col-sm">
            <RenderVideos
              key={video.id}
              video={video}
              deleteVideos={deleteVideos}
            />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
