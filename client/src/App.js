import "./App.css";
import React, { useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";

const App = () => {
  const [videos, setVideos] = useState(videosData);

  ;

  const handleAddVideo = (newVideo) => {};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((video) => (
        <Video
          key={video.id}
          video={video}
          //onUpVote={handleUpVote}
          //onDownVote={handleDownVote}
          //onRemove={handleRemoveVideo}
        />
      ))}
      <AddVideo onAddVideo={handleAddVideo} />
    </div>
  );
};

export default App;
