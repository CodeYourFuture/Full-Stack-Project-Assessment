import React, { useState, useEffect } from "react";
import AddNewVideo from "./AddNewVideo";
import "./App.css";
// import dataVideo from "./exampleresponse.json";
import RenderVideo from "./RenderVideo";

function App() {
  const [allVideos, setVideoData] = useState([]);
  const [addVideo, setAddVideo] = useState(false);

  //Removing 1 video

  const deleteVideos = (id) => {
    setVideoData((allVideos) => allVideos.filter((video) => video.id !== id));
  };

  const urlToFetch = "http://localhost:5000";

  const createVideo = () => {
    fetch(`${urlToFetch}`)
      .then((res) => res.json())
      .then((data) => {
        setVideoData(data);
      });
  };

  useEffect(() => {
    createVideo();
  }, []);

  return (
    <div className="App">
      <header className="headerApp">
        <h1>Video Recommendation</h1>
      </header>
      <button
        onClick={() => setAddVideo(true)}
        type="button"
        className="btn btn-link"
      >
        Add Video
      </button>
      {addVideo && (
        <AddNewVideo
          newVideo={allVideos}
          setVideoData={setVideoData}
          setAddVideo={setAddVideo}
          urlToFetch={urlToFetch}
          createVideo={createVideo}
        />
      )}
      <div className="container">
        <div className="row">
          {allVideos
            .sort((a, b) => b.rating - a.rating)
            .map((video) => (
              <div className="col-sm-6" key={video.id}>
                <RenderVideo video={video} handleDeletedVideo={deleteVideos} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
