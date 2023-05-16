import React, { useState } from "react";
import videosData from "./exampleresponse.json";
import VideoList from "./component/VideoList";


const App = () => {
  const [videos, setVideos] = useState(videosData);
  const handleRemove = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };
  return (
    <div className="app">
      <h1>Video List</h1>
      <VideoList videos={videos} onRemove={handleRemove} />
    </div>
  );
};
export default App;
