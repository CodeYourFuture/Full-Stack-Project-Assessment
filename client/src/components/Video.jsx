import React, { useState } from "react";
import "./Video.css";
import { AiOutlineLike, AiOutlineDislike, AiOutlineDelete } from 'react-icons/ai';

const Video = ({ id, title, url, rating, onDelete }) => {
  
  const [LiveRating, setLiveRating] = useState(rating); 
  
  
  // const handleLike = () => {
  //   if (id) {
  //     setLiveRating(LiveRating + 1);
  //     updateRating(LiveRating + 1);

  //   }
  // };

  // const handleDislike = () => {
  //   if (id && LiveRating > 0) {
  //     setLiveRating(LiveRating - 1);
  //     updateRating(LiveRating - 1);
  //   }
  // };


const handleLike = () => {
  if (id) {
    const newRating = LiveRating + 1;
    setLiveRating(newRating);
    updateRating(id, newRating);
  }
};

const handleDislike = () => {
  if (id && LiveRating > 0) {
    const newRating = LiveRating - 1;
    setLiveRating(newRating);
    updateRating(id, newRating);
  }
};

  const handleDeleteVideo = () => {
     if (id) {
       onDelete(id);
     }
  };
   const updateRating = (id, newRating) => {
     fetch(`https://full-stack-server-8ry9.onrender.com/videos/${id}/rating`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ rating: newRating }),
     })
       .then((response) => response.json())
       .then((data) => console.log(data))
       .catch((error) => console.log(error));
   };

  return (
    <div className="video">
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
      <p>Rate: {LiveRating}</p>
      <div className="btn">
        <button className="like-btn" onClick={handleLike}>
          <AiOutlineLike size={24} />
        </button>
        <button className="dislike-btn" onClick={handleDislike}>
          <AiOutlineDislike size={24} />
        </button>
        <button className="delete-btn" onClick={()=>handleDeleteVideo()}>
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default Video;