import React from "react";
import "./Video.css";
import { AiOutlineLike, AiOutlineDislike, AiOutlineDelete } from 'react-icons/ai';

const Video = ({ id, title, url, rating }) => {
    
  const handleLike = () => {
    
  };

  const handleDislike = () => {
    
  };

  const handleDeleteVideo = () => {
    
  };

  return (
    <div className="Video">
      <h3>{title}</h3>
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${url}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>Rate: {rating}</p>
      <div className="btn">
        <button className="like-btn" onClick={handleLike}>
          <AiOutlineLike size={24} />
        </button>
        <button className="dislike-btn" onClick={handleDislike}>
          <AiOutlineDislike size={24} />
        </button>
        <button className="delete-btn" onClick={handleDeleteVideo}>
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default Video;