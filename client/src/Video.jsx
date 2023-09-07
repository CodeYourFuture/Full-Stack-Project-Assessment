

import React, { useState } from 'react';

function Video({ video, onRemove }) {

  const [rating, setRating] = useState(video.rating); 

  const handleUpVote = () => {
    setRating(rating + 1); 
  };

  const handleDownVote = () => {
    setRating(rating - 1); 
  };

  return (
    <div className="Video-container">
      <h2>{video.title}</h2>
      
      <div className="video-embed">
       <iframe
  width="560"
  height="315"
  src={video.url}
  title={video.title}
  allowFullScreen
/>

      </div>
      
      <p>Rating: {rating}</p> 
      
      <button className="btn" onClick={() => onRemove(video.id)}>
        Remove Video
      </button>
      
     
      <button className="btn" onClick={handleUpVote}>
        Up Vote
      </button>
      
  
      <button className="btn" onClick={handleDownVote}>
        Down Vote
      </button>
    </div>
  );
}

export default Video;
