import React, { useState } from "react";
import "./App.css";
import AddVideo from "./component/AddVideo";
import ListVideo from "./component/ListVideo";
import exampleresponse from "../../server/data/exampleresponse.json";

function App() {
  const [videosYoutube, setVideosYoutube] = useState(exampleresponse);

  const addVideo = (video) => {
    console.log(video);
    let newVideoList = [...videosYoutube];
    newVideoList.push(video);
    console.log(newVideoList);
    setVideosYoutube(newVideoList);
  };

  const deleteVideo = (videoId) => {
    const newVideoList = videosYoutube.filter((video) => video.id !== videoId);
    setVideosYoutube(newVideoList);
  };

  return (
    <div className="App">
      <header className="App-header">Video Recommendation</header>
      <AddVideo addVideo={addVideo} />
      <ListVideo videosYoutube={videosYoutube} deleteVideo={deleteVideo} />
    </div>
  );
}

export default App;
