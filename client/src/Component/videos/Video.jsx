import React from "react";
import Rating from "../rating/rating";

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

const Video = ({ video, handleVote, handleRemove }) => {
  const uploadDate = new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  );

  const videoUrl = video.url.startsWith("https://www.youtube.com/watch?v=")
    ? convertWatchToEmbedLink(video.url)
    : video.url;

  return (
    <div className="video">
      <h2>{video.title}</h2>
      <div className="anything">
        <iframe
          src={videoUrl}
          title={video.title}
          allowFullScreen
        />
      </div>

      <Rating
        video={video}
        handleVote={handleVote}
        handleRemove={handleRemove}
      />

      <p>Uploaded: {uploadDate.toLocaleString()}</p>
    </div>
  );
};

export default Video;
