import React, {useState} from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";

function Video({video}) {
  
  const [votes, setVotes] = useState(0);
  const handleLike = () => {
    setVotes(votes + 1);
  };
  const handleDisLike = () => {
    setVotes(votes - 1);
  };


  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeIcon handleLike={handleLike} />
        <p>{votes} Vote</p>
        <DislikeIcon handleDisLike={handleDisLike} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton />
    </div>
  );
}

export default Video