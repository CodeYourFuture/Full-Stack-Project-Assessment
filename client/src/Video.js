import React, {useState} from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({video}) {
  const [vote, setVote] = useState(video.rating);

  const add = () =>{
    setVote(vote +  1);
  }

  const disLike = () =>{
    setVote(vote - 1);
  }
    return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className='vote-container'>
        <LikeIcon add={add} />
        <p>0 Vote</p>
        <DislikeIcon disLike={disLike} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton />
    </div>
  );
}

export default Video