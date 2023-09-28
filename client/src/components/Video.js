import React from 'react';

function Video (props) {
  const videoId = props.link;
  const changedVideoId = videoId.replace("https://www.youtube.com/watch?v=", "");

  const handleAddRating = () => {
    props.AddRating(props.name, props.rating); 
  };

  const handleDownRating = () => {
    props.downRating(props.name);
  };

  const handleDelete = () => {
    props.deleteVideo(props.name);
  };

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.link}</p>
      <iframe width="460" height="250" src={`https://www.youtube.com/embed/${changedVideoId}`} title="YouTube player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div>
        <button onClick={handleAddRating}>Plus</button>
        <span> Rating: {props.rating} </span>
        <button onClick={handleDownRating}>Minus</button>
        <button onClick={handleDelete}>Delete Video</button>
      </div>
    </div>
  );
};

export default Video;