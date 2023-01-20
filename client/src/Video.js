import React, { useState } from "react";
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({video, remove}) {
  const [count, setCount] = useState(video.rating);
  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    setCount(count - 1);
  }
  return (
    <div className="video-container" id={video.id}>
      <p>{video.title}</p>
      <div className='vote-container'>
        <LikeIcon increment={increment}/>
        <p>{count}</p>
        <DislikeIcon decrement={decrement} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton remove={remove}  id={video.id} />
    </div>

  )
}

export default Video