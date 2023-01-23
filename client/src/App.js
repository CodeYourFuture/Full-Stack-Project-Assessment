import React, { useState, useEffect } from "react";
import "./App.css";
import Video from "./Video";
import dataVideos from "./exampleresponse.json";
import AddVideoButton from "./AddVideoButton";
import Search from "./Search";

function App() {
  const [videoData, setVideoData] = useState([]);
  const [userAddedVid, setUserAddedVid] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);

  //Fetch data from express api running locahost
  // NB. had to install cors in express for this to work.
  useEffect(() => {
    fetch(
      `https://full-stack-project-assessment-server.onrender.com/`
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
