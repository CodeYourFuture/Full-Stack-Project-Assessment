import React, { useState } from "react";
import AddNewVideo from "./AddNewVideo";
import "./App.css";
import dataVideo from "./exampleresponse.json";
import RenderVideo from "./RenderVideo";

function App() {
  const [allVideos, setVideoData] = useState(dataVideo);
  const [addVideo, setAddVideo] = useState(false);

  //Removing 1 video
  // const deleteViedeos = (deletedViedeoId) => {
  //   setVideoData(
  //     allVideos.filter((video) => {
  //       return video.id !== deletedViedeoId;
  //     })
  //   );
  // }

  const deleteViedeos = (id) => {
    setVideoData((allVideos) => allVideos.filter((video) => video.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
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
        />
      )}
      <div className="container">
        <div className="row">
          {allVideos
            .sort((a, b) => b.rating - a.rating)
            .map((video) => (
              <div className="col-sm-4" key={video.id}>
                <RenderVideo video={video} handleDeletedVideo={deleteViedeos} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
