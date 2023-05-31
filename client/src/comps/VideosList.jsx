import React, { useState, useEffect } from "react";
import "../styles/VideosList.css";
// import data from "../data.json";
import SingleVideo from "./SingleVideo";
import AddVideo from "./AddVideo";

function VideosList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
    .then((res) => res.json())
    .then((data) => {
      setVideos(data)
    })
    .catch((error) => console.log(error))
  }, []);

  

  const handleDeleteVideo = async (id) => {
    fetch(`http://localhost:5000/${id}`, {method: "DELETE",})
    .then((res) => res.json())
    .then((data) => {
      const updatedVideos = data.filter((video) => video.id !== id);
      setVideos(updatedVideos);
    });
  }

  // function handleDeleteVideo(id) {
  //   const updatedVideos = videos.filter((video) => video.id !== id);
  //   setVideos(updatedVideos);
  // }

  // Add new video
  const handleVideoAdd = (video) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  return (
    <div className="videos-list-container">
      <h3>Your Videos:</h3>
      <AddVideo onVideoAdd={handleVideoAdd} />

      <div className="your-videos-container">
        {videos
          .sort((a, b) => b.rating - a.rating)
          .map((vid) => (
            <div className="single-video-container" key={vid.id}>
              <SingleVideo
                id={vid.id}
                title={vid.title}
                url={`https://www.youtube.com/embed/${vid.url.slice(32)}`}
                rating={vid.rating}
              />
              <button
                onClick={() => handleDeleteVideo(vid.id)}
                className="delete-video-button"
              >
                Delete video
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default VideosList;
