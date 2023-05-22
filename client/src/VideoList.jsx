import React, { useState } from "react";
import "./VideoList.css";
import videoData from "./exampleresponse.json";
import Input from "./Input";

const VideoList = () => {
  const [videos, setVideos] = useState(videoData);

  const handleVoteUp = (id) => {
    const updateVideos = videos.map((video) => {
      if (video.id === id) {
        return { ...video, rating: video.rating + 1 };
      }
      return video;
    });
    setVideos(updateVideos);
  };

  const handleVoteDown = (id) => {
    const updateVideos = videos.map((video) => {
      if (video.id === id) {
        const newRating = Math.max(0, video.rating - 1);
        // Making sure the rating doesn't go below 0
        return { ...video, rating: newRating };
      }
      return video;
    });
    setVideos(updateVideos);
  };

  const handleDelete = (id) => {
    const filteredVideos = videos.filter((video) => video.id !== id);
    setVideos(filteredVideos);
  };

  const handleAddVideo = (title, url) => {
    const newVideo = {
      id: Date.now(),
      title,
      url,
      rating: 0,
    };
    setVideos([...videos, newVideo]);
  };

  return (
    <>
      <Input onAddVideo={handleAddVideo} />
      <div className="box">
        {videos.map((video) => (
          <div className="card" key={video.id}>
            <h2>{video.title}</h2>
            <div>
              <iframe
                src={video.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <p>vote: {video.rating}</p>
            <div className="group-button">
              <button onClick={() => handleVoteUp(video.id)}>Vote Up</button>
              <button onClick={() => handleVoteDown(video.id)}>
                Vote Down
              </button>
              <button onClick={() => handleDelete(video.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoList;
