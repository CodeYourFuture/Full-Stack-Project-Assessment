import React, { useState } from 'react';

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
        <button onClick={() => removeVideo(id)}>Remove Video</button>
      </div>
 
  );
};

export default Videocard;



