import React from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({video}) {
  
  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className='vote-container'>
        <LikeIcon />
        <p>0 Vote</p>
        <DislikeIcon />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton />
    </div>
  );
}

export default Video