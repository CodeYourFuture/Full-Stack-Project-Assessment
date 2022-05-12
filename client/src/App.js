import React, {useState} from "react";
import "./App.css";
import videoData from "./exampleresponse.json";
import RenderVideo from "./RenderVideo";

function App() {
  const [allVideos, setAllVideos] = useState(videoData);

  //This deletes one video
  const deleteVideos = (deletedVideoId) => {
    setAllVideos(allVideos.filter((video) => {
      return video.id !== deletedVideoId;
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {allVideos.map((video, index) =>
        <RenderVideo video={video} handleDeletedVideo={deleteVideos} key={index} />
      )}
    </div>
  );
}

/*




[Vi1, v2, v3, ]

[v1,v3, ]







*/

export default App;
