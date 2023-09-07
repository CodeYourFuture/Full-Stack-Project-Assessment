// src/App.js
import React, { useState } from "react";
import { videosData } from "../data/data";
import VideoForm from "../Component/videos/videoForm";
import Video from "../Component/videos/Video";
import "./main.css"
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Main() {
    const [videos, setVideos] = useState(videosData);

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
        ].sort((a, b) => b.votes - a.votes)); // Sort videos by votes
      };

    return (
        <div className="container-fluid bg-dark text-white">
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
