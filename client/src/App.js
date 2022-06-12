import React, { useEffect, useState } from "react";
import "./App.css";
import "./RenderVideos.css";
import RenderVideos from "./RenderVideos";
import NewVideos from "./NewVideos";

import axios from "axios";


function App() {
 
  const [allVideos, setAllVideos] = useState([]);
  const [visible, setVisible] = useState(false);

  // A function to delete a video
  const deleteVideos = (arrVideo) => {
    setAllVideos((videos) => {
      return videos.filter((v) => {
        return v.id !== arrVideo.id;
      });
    });
  };

useEffect(()=>{
axios.get("http://localhost:4000/")
  .then((res) => {
   setAllVideos(res.data);
  });
},[])
  

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
      <div className="container">
        <div className="row">
          {allVideos.map((video) => (
            <div key={video.id} className="col-sm-4">
              <RenderVideos
                
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
