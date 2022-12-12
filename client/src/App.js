import React, { useState } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideoButton from "./AddVideoButton";
import Search from "./Search";

function App() {
  const [videoData, setVideoData] = useState(dataVideos);
  const [userAddedVid, setUserAddedVid] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="inputs">
        <AddVideoButton
          videoData={videoData}
          setVideoData={setVideoData}
          setUserAddedVid={setUserAddedVid}
        />
        <Search
          videoData={videoData}
          setVideoData={setVideoData}
          dataVideos={dataVideos}
          userAddedVid={userAddedVid}
        />
      </div>
      <div className="body">
        {videoData.map(({ id, title, url, rating }, index) => (
          <Video
            key={index}
            videoData={videoData}
            setVideoData={setVideoData}
            title={title}
            url={url}
            id={id}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
