import React, { useState } from 'react';


function convertWatchToEmbedLink(watchLink) {
  const watchPattern = /https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/;
  const match = watchLink.match(watchPattern);
  if (match && match.length === 2) {
    const videoId = match[1];
    const embedLink = `https://www.youtube.com/embed/${videoId}`;
    return embedLink;
  } else {
    return watchLink;
  }
}

function Video({ video, onRemove }) {
  const [rating, setRating] = useState(video.rating);

  const handleUpVote = () => {
    setRating(rating + 1);
  };

  const handleDownVote = () => {
    setRating(rating - 1);
  };


  const videoUrl = video.url.startsWith('https://www.youtube.com/watch?v=')
    ? convertWatchToEmbedLink(video.url)
    : video.url;

  const uploadDate = new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  );

  return (
    <div className="Video-container">
      <h2>{video.title}</h2>
      <div className="video-embed">
        <iframe
          width="560"
          height="315"
          src={videoUrl}
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
      <p>Uploaded: {uploadDate.toLocaleString()}</p>
    </div>
  );
}

export default Video;
