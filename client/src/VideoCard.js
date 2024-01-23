import React from 'react';
import config from './config.js';

const Videocard = ({ video, removeVideo, upVote, downVote }) => {
  const { id, title, url, upVotes, downVotes } = video;

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

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <iframe src={embedVideos(url)} title={title} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
        <p className="card-text">Upvotes: {upVotes} | Downvotes: {downVotes}</p>
        <button onClick={() => upVote(id)} className="btn btn-success mx-2">Upvote</button>
        <button onClick={() => downVote(id)} className="btn btn-danger">Downvote</button>
        <button onClick={handleRemoveVideo} className="btn btn-secondary mx-2">Remove</button>
      </div>
    </div>
  );
}

export default Videocard;




