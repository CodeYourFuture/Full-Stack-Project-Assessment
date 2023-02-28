import React, { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";

const Video = ({ video, handleDelete }) => {
  const [rating, setRating] = useState(video.rating);

  const handleVoteUp = () => {
    setRating(rating + 1);
  };

  const handleVoteDown = () => {
    setRating(rating - 1);
  };

  return (
    <div className="video-container">
      <div className="vote-container">
        <span className="hand-up" onClick={handleVoteUp}>
          <BsHandThumbsUp />
        </span>{" "}
        {rating}{" "}
        <span className="hand-down" onClick={handleVoteDown}>
          <BsHandThumbsDown />
        </span>
      </div>

      <div className="video">
        <h3>{video.title}</h3>
        <iframe
          width="315"
          height="200"
          src={video.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <button onClick={() => handleDelete(video.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Video;
