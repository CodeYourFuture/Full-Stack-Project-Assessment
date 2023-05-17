import React, { useState } from "react";
import VideoList from "./component/VideoList";
import videosData from "./exampleresponse.json";

const App = () => {
  const [videos, setVideos] = useState(videosData);

  const handleRemove = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };

   const handleVote = (id, increment) => {
     setVideos((prevVideos) =>
       prevVideos.map((video) =>
         video.id === id
           ? { ...video, rating: video.rating + increment }
           : video
       )
     );
   };

  return (
    <div className="app">
      <h1>Video List</h1>
      <VideoList videos={videos} onRemove={handleRemove} onVote={handleVote} />
    </div>
  );
};

export default App;