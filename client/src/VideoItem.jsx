import React from 'react';

const VideoItem = ({ video, onDelete, onVote }) => {

  const videoId = video.url.split('v=')[1];

  return (
    <div className="video-item">
      <iframe
        className='iframe'
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
        allowfullscreen
      ></iframe>
      
      <h5>{video.title}</h5>
      <p>Votes: {video.rating}</p>

      <i onClick={() => onVote(video.id, "up")} type="button" class="fa fa-thumbs-up" style={{ fontSize: '24px' }}></i>

      <i onClick={() => onVote(video.id, "down")} type="button" class="fa fa-thumbs-down" style={{ fontSize: '24px' }}></i>

      <button
        onClick={() => onDelete(video.id)}
        type="button"
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  );
};

export default VideoItem;






