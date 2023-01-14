import React from 'react';
import './App.css';
// import { useState } from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({ video, deletes }) {
  
  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className='vote-container'>
        <LikeIcon />
        <p>{video.id} Vote</p>
        <DislikeIcon />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton id={video.id} deleteB={deletes} />
    </div>
  );
}

export default Video 