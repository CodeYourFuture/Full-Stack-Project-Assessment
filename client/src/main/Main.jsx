import React, { useState, useEffect } from "react";
import VideoForm from "../Component/videos/videoForm";
import Video from "../Component/videos/Video";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {backEndApi } from "../config/config.js";

function Main() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    fetch(`${backEndApi}/?order=${order}`)
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the server:", error);
      });
  }, [order]);

  const handleVote = (id, value) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === id ? { ...video, votes: video.votes + value } : video
      )
    );
  };

  const handleRemove = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const handleAddVideo = (newVideo) => {
    setVideos((prevVideos) => [
      ...prevVideos,
      { ...newVideo, id: Date.now(), votes: 0, uploadDate: new Date() },
    ].sort((a, b) => b.votes - a.votes));
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="container-fluid bg-dark text-white">
     <button onClick={toggleOrder}>
        {order === "asc" ? "Order by Descending" : "Order by Ascending"}
      </button>
      <VideoForm handleAddVideo={handleAddVideo} />
      <div className="row justify-content-center">
        <div className="col-lg-11 col-md-10">
          <div className="video-list row row-cols-1 row-cols-md-4">
            {videos.map((video) => (
              <div key={video.id} className="col mb-4">
                <div className="card h-100 bg-dark border-light">
                  <Video
                    video={video}
                    handleVote={handleVote}
                    handleRemove={handleRemove}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
