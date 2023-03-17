import React from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({video, removeItem}) {
  const {id, title, rating} = video;
  return (
    <article className='col gx-1' key={id}>
      <p>{title}</p>
      <div className='vote-container'>
        <LikeIcon />
        <p>{rating}Vote</p>
        <DislikeIcon />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton video={video}  removeItem={removeItem}/>
    </article>
  );
}

export default Video