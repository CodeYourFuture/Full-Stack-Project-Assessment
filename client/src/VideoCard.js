import React, { useState } from 'react';
import config from './config.js';

const Videocard = ({ video, removeVideo, upVote, downVote }) => {
  const { id, title, url } = video;
  const [rating, setRating] = useState(video.rating)
  
  function embedVideos(url) {
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1];

      return `https://www.youtube.com/embed/${videoId}`;
    } else {

      return url;
    }
  }

  async function handleRemoveVideo() {
    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/videos/${id}`, {
        method: 'DELETE',
      });
  
      if (response.status === 200) {
        
        removeVideo(id); 
      } else if (response.status === 404) {
        console.error('Video not found on the backend.');
      } else {
        console.error('Error deleting the video from the backend.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the video:', error);
    }
  }
  
    
   function handleUpVote() {
    setRating(rating + 1);
  }
  
    function handleDownVote() {
    setRating(rating - 1);
  }



   return (
    <div className="video"> 
     
        <h2>{title}</h2>
        <iframe width="250" height="250" src={embedVideos(url)} title={title} allowFullScreen></iframe>
        <p className="video-rating">Votes: {rating}</p>
        <button className="upvote-button" onClick={handleUpVote}></button>
        <button className="downvote-button" onClick={handleDownVote}></button>
        <button onClick={handleRemoveVideo}>Remove Video</button>
      </div>
 
  );
};

export default Videocard;



