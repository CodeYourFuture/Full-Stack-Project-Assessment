
import React from 'react';

const VideoComponent = ({ video, removeVideo, upVote, downVote }) => {
  const { id, title, url, rating } = video;
  
  const handleUpVote = () => {
   fetch(`/videos/${video.id}/upvote`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upvote video');
        }
       upVote(video.id);
      })
      .catch((error) => {
        console.error('Error upvoting video:', error);
      });
  };

  const handleDownVote = () => {
    fetch(`/api/videos/${video.id}/downvote`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to downvote video');
        }
       downVote(video.id);
      })
      .catch((error) => {
        console.error('Error downvoting video:', error);
      });
  };

  return (
    <div className="video">
  <h2>{title}</h2>
  <iframe width="100" height="100" src={url} title={title} allowFullScreen></iframe>
  <p>Votes: {rating}</p>
  <button className="upvote-button" onClick={handleUpVote}></button>
  <button className="downvote-button" onClick={handleDownVote}></button>
  <button onClick={() => removeVideo(id)}>Remove Video</button>
</div>
  );
};

export default VideoComponent;
