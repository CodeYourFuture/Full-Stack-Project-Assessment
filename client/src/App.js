import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideoButton from "./AddVideoButton";
import Search from "./Search";

function App() {
  const [videoData, setVideoData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  //Fetch data from express api running locahost
  // NB. had to install cors in express for this to work.
  useEffect(() => {
    // "http://localhost:5000/"
    // "https://full-stack-project-assessment-server.onrender.com/"
    fetch(
      "https://full-stack-project-assessment-server.onrender.com/"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setVideoData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // Sort video data by rating
  videoData.sort((a, b) => b.rating - a.rating);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div className="inputs">
        <AddVideoButton
          videoData={videoData}
          setVideoData={setVideoData}
          url={url}
          setUrl={setUrl}
          title={title}
          setTitle={setTitle}
        />
        <Search
          videoData={videoData}
          dataVideos={dataVideos}
          setVideoData={setVideoData}
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
            setUrl={setUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
