import React, { useState } from 'react';

function Video({ video, onRemove }) {
  const [rating, setRating] = useState(video.rating);

  const handleUpVote = () => {
    setRating(rating + 1);
  };

  const handleDownVote = () => {
    setRating(rating - 1);
  };

  // Extract the video ID from the YouTube URL
  const videoId = video.url.split('/embed/')[1];

  // Construct the embedded URL with the extracted video ID
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="Video-container">
      <h2>{video.title}</h2>
      <div className="video-embed">
        <iframe
          width="560"
          height="315"
          src={embedUrl}
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
