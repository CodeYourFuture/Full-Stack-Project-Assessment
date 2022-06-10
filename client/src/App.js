import React, {useState} from "react";
import AddNewVideo from "./AddNewVideo";
import "./App.css";
import videoData from "./exampleresponse.json";
import RenderVideo from "./RenderVideo";

function App() {
  const [allVideos, setAllVideos] = useState(videoData);
  const [addVideo, setAddVideo] = useState(false);

  //This deletes one video
  const deleteVideos = (id) => {
    setAllVideos((allVideos)=>allVideos.filter((video)=> video.id !== id))
  }

  return (
    <div className="card text-center">
      <header>
        <h2 className="card-header">Video Recommendation</h2>
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
          setAllVideos={setAllVideos}
          setAddVideo={setAddVideo}
        />
      )}
      <div className="container">
        <div className="row">
          {allVideos
            .sort((a, b) => b.rating - a.rating)
            .map((video) => (
              <div className="col-sm-4" key={video.id}>
                <RenderVideo video={video} handleDeletedVideo={deleteVideos} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/*




[Vi1, v2, v3, ]

[v1,v3, ]







*/

export default App;
