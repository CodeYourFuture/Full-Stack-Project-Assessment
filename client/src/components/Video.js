import React from 'react';


function Video (props) {
  const videoId = props.link;
  const changedVideoId = videoId.replace("https://www.youtube.com/watch?v=", "")

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.link}</p>
      <iframe width="460" height="250" src= {`https://www.youtube.com/embed/${changedVideoId}`} title="YouTube player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <div>
        <button onClick={props.AddRating}>Plus</button>
        <span> Rating: {props.rating} </span>
        <button onClick={props.downRating}>Minus</button>
      </div>
    </div>
  );
};

export default Video;