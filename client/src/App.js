import "./App.css";
import { useState } from "react";
import NewVideo from "./components/NewVideo/NewVideo";
import VideoComponent from "./components/VideoComponent/VideoComponent";

import videoData from "./exampleresponse.json";

function App() {
  const [currVideos, setCurrVideos] = useState(videoData);

  const videoSubmitHandler = (submittedVideo) => {
    setCurrVideos((prevVideos) => [submittedVideo, ...prevVideos]);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='pageHeading'>Video Recommendation</h1>
      </header>
      <NewVideo videoSubmitHandler={videoSubmitHandler} />
      <div>
        {currVideos.map((video, index) => (
          <VideoComponent
            key={index}
            videoId={video.url.split("v=")[1].substring(0, 11)}
            videoTitle={video.title}
            videoRating={video.rating ? video.rating : ""}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
