import React, {useState} from 'react';
import DeleteButton from './buttons/DeleteButton';
import LikeIcon from './buttons/LikeIcon';
import DislikeIcon from './buttons/DislikeIcon';
import YouTubeEmbed from './YouTubeEmbed';
import "bootstrap/dist/css/bootstrap.css";


function Video({ video, deleteVideo, value }) {
  const [vote, setVote] = useState(0);

  const add = () => {
    setVote((vote) => {
      return vote + 1;
    });
  };
  const disLike = () => {
    setVote((vote) => {
      return vote - 1;
    });
  };
  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeIcon onClick={add} />
        <p>{vote > 0 ? `${vote}` : 0}</p>
        <DislikeIcon onClick={disLike} />
      </div>
      <YouTubeEmbed video={video} />
      <DeleteButton deleteVideo={deleteVideo} value={value} />
      <p>Rating: {video.rating}</p>
     
    </div>
  );
}

export default Video