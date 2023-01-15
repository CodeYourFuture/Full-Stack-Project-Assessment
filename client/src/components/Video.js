import React from 'react';
import DeleteButton from '../buttons/DeleteButton';
import LikeIcon from '../buttons/LikeIcon';
import DislikeIcon from '../buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/VideoContext';

function Video({ video }) {
  const { handleDelete } = useGlobalContext()
  const [rate, setRate] = useState(video.rating)
  const handleLikeClick = () => {
    setRate(rate + 1);
  }
  const handleDislikeClick = () => {
    setRate(rate - 1);
  }

  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className='vote-container'>
        <LikeIcon handleLikeClick={handleLikeClick} />
        <p>{rate}</p>
        <DislikeIcon handleDislikeClick={handleDislikeClick} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton handleDelete={handleDelete} id={video.id} />
      <Link to={`post/${video.id}`} className='btn btn-secondary btn-details'>
        View video
      </Link>
    </div>
  );
}

export default Video