import React, { useState } from "react";
import videoList from "./exampleresponse.json";
import Video from "./Video";
import "./index.css";

const App = () => {
  const [videos, setVideos] = useState(videoList);

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

  return (
    <div className="container">
      {videos.map((video) => (
        <Video key={video.id} video={video} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default App;
