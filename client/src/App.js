import React, { useState, useEffect } from "react";
import AddVideoForm from "./components/AddVideoForm";
import VideoCard from "./components/VideoCard";
// import exampleresponse from "./data/exampleresponse.json";
import "./App.css";

const sortVideosByRating = (videos) =>
  videos.sort((v1, v2) => (v1.rating < v2.rating ? 1 : -1));

const deleteVideo = (id, initialVideos) =>
  initialVideos.filter((video) => video.id !== id);

// let allVideos = sortVideosByRating([...exampleresponse]);

const App = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serverUrl = "https://simeon-video-recommendation.onrender.com";

// Get "/"
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(serverUrl);
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        let actualData = await res.json();
        setVideos(actualData);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setVideos(null);
        setLoading(false);
        console.error(`An error occurred: ${err}`);
      } 
      // finally {
      //   setLoading(false);
      // }
    };
    getData();
  }, []);

  // Post "/"

  const deleteAction = (id) => {
    setVideos(deleteVideo(id, videos));
  };

  return (
    <div className="App">
      <header className="App_header">
        <h1>Video Recommendation</h1>
        <AddVideoForm setVideos={setVideos} />
      </header>
      <div className="video_container">
        {loading && <span>Loading, please wait...</span>}
        {error && (
          <span>{`There is a problem fetching the post data - ${error}`}</span>
        )}
        {videos &&
          sortVideosByRating(videos.videos).map((video) => (
            <VideoCard
              video={video}
              key={video.id}
              delVid={() => deleteAction(video.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
