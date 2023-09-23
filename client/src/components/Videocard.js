import React from "react";

function Videocard(props) {
  const videoId = props.link;
  const modifiedVideoId = videoId.replace(
    "https://www.youtube.com/watch?v=",
    ""
  );

  // Define click handlers for adding and subtracting ratings
  const handlePlusRating = () => {
    props.plusRating(props.name, props.rating); // Pass the video title to the plusRating function
  };

  const handleSubtractRating = () => {
    props.subtractRating(props.name); // Pass the video title to the subtractRating function
  };

  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.link}</p>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${modifiedVideoId}`}
        title="YouTube video player"
        
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div>
        <button onClick={handlePlusRating}>Add</button>
        <span> Rating: {props.rating} </span>
        <button onClick={handleSubtractRating}>Minus</button>
      </div>
    </div>
  );
}

export default Videocard;
