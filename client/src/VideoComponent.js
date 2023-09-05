
import React from 'react';

const VideoComponent = ({ video, removeVideo, upVote, downVote }) => {
  const { id, title, url, rating } = video;

  return (
    <div className="video">
  <h2>{title}</h2>
  <iframe width="100" height="100" src={url} title={title} allowFullScreen></iframe>
  <p>Votes: {rating}</p>
  <button className="upvote-button" onClick={() => upVote(id)}></button>
  <button className="downvote-button" onClick={() => downVote(id)}></button>
  <button onClick={() => removeVideo(id)}>Remove Video</button>
</div>
  );
};

export default VideoComponent;
