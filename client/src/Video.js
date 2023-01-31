import React from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({video, setvideos, videos}) {
  
  return (
    <div className="video-container">
      <p>{video.title}</p>
      <p>Rating: {video.rating}</p>
      <LikeIcon />
      <YouTubeEmbed video={video} />
      <DeleteButton videos={videos} setvideos={setvideos} video={video}  />
    </div>
  );
}

export default Video