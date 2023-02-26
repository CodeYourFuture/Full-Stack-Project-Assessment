import React, { useState } from "react";

function LikesButton(props) {
  const [like, setLike] = useState(0);

  function handleLike() {
    setLike(like + 1);
  }

  function handleDislike() {
    setLike(like - 1);
  }

  return (
    <div>
      <p>{props.title}</p>
      
  <iframe src={props.link} 
title="YouTube video player" 
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
allowFullScreen
width="560" height="315">
</iframe>


<h3> Rating: {props.rating}</h3>

      <p>Like: {like} </p>
      <button onClick={handleLike}>👍</button>
      <button onClick={handleDislike}>👎</button>
    </div>
  );
}






// import React from "react";


// function YoutubeVideos(props) {
//     return(
// <div className="video-container">

// <div className="video-item">
// <p>{props.title}</p>

// <iframe src={props.link} 
// title="YouTube video player" 
// frameBorder="0" 
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
// allowFullScreen
// width="560" height="315">
// </iframe>

// <h3> Rating: {props.rating}</h3>
// </div>

// </div>
//     );
// }

// export default YoutubeVideos;

export default LikesButton;
