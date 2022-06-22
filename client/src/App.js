import React, { useEffect, useState } from "react";
import "./App.css";
import "./RenderVideos.css";
import RenderVideos from "./RenderVideos";
import NewVideos from "./NewVideos";
import axios from "axios";


function App() {
  const [allVideos, setAllVideos] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/").then((res) => {
      setAllVideos(res.data);
    });
  }, []);

  // A function to delete video
  const deleteVideos = (arrVideo) => {
    //To delete from front end
    //  setAllVideos((videos) => {
    //    return videos.filter((v) => {
    //      return v.id !== arrVideo.id;
    //    });
    //  });

    // To delete from the server
       axios.delete(`http://localhost:4000/${arrVideo.id}`).then((res) => {
         if (res.status === 200) {
           axios.get("http://localhost:4000/").then((res) => {
             setAllVideos(res.data);
           });
         }
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

      <div className="wrapper">
        {allVideos.map((video) => (
          <div className="video-card" key={video.id}>
            <RenderVideos video={video} deleteVideos={deleteVideos} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
