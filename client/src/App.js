import "./App.css";
import { useState, useEffect } from "react";
import NewVideo from "./components/NewVideo/NewVideo";
import VideoComponent from "./components/VideoComponent/VideoComponent";

function App() {
  const [currVideos, setCurrVideos] = useState([]);

  // No dependencies provided as I want it to run only once when the component is loaded
  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        setCurrVideos(data.videos);
      });
  }, []);

  const videoSubmitHandler = (submittedVideo) => {
    fetch("http://127.0.0.1:5000/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId: submittedVideo.url.split("v=")[1].substring(0, 11),
        videoTitle: submittedVideo.title,
        videoUrl: submittedVideo.url,
      }),
    })
      .then((response) => response.json())
      .then((data) => setCurrVideos(data.videos));
    // setCurrVideos((prevVideos) => [...prevVideos, submittedVideo]);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='pageHeading'>Video Recommendation</h1>
      </header>
      <NewVideo videoSubmitHandler={videoSubmitHandler} />
      <div className="videos">
        {currVideos.map((video, index) => (
          <VideoComponent
            key={index}
            videoId={video.url.split("v=")[1].substring(0, 11)}
            videoTitle={video.title}
            videoRating={video.rating ? video.rating : 0}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
