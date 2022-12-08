import React, { useState } from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({ video, removeVideo }) {

  const [vote, setVote] = useState(0);

  const handleLike = () => setVote(vote + 1);
  const handleDislike = () => vote > 0 ? setVote(vote - 1) : "";

  return (
    <div className="video-container card p-2">
      <p className='text-center my-1'>{video.title}</p>
      <YouTubeEmbed video={video} />
      <div className='d-flex justify-content-between mt-1'>
        <div className='vote-container d-flex align-items-center'>
          <LikeIcon like={handleLike} />
          <p>{vote}</p>
          <DislikeIcon dislike={handleDislike} />
        </div>
        <DeleteButton remove={removeVideo} />
      </div>
    </div>
  );
}

export default Video