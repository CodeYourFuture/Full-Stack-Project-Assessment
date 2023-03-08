import React, { useState, useEffect } from "react";
// import videoList from "./exampleresponse.json";(from my local machine)
import Video from "./Video";
import "./index.css";

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/videoList")
      .then((response) => response.json())
      .then((data) => {
        return setVideos(data);
      });
  }, []);

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
