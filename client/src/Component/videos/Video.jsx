// src/components/Video.js
import React from "react";
import Rating from "../rating/rating";

const Video = ({ video, handleVote, handleRemove }) => {

  const uploadDate = new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  );
  return (
    <div className="video">
      <h2>{video.title}</h2>
      <iframe
        title={video.title}
        width="560"
        height="315"
        src={video.url}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <Rating
        video={video}
        handleVote={handleVote}
        handleRemove={handleRemove}
      />

<p>Uploaded: {uploadDate.toLocaleString()}</p>
    </div>
  );
};

export default Video;
