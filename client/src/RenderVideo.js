import React, { useState } from "react";
import ThumbsImage from "../src/images/ThumbsImage.png";
import thumbsDown from "../src/images/thumbsDown.png";



const RenderVideo = ({ video, handleDeletedVideo }) => {
  const [count, setCount] = useState(0);

  //This increaments the like button
  const incrementCount = () => {
    setCount(count + 1);
  };
//This decrements the dislike button
  const decrementCount = () => {
    setCount(count - 1);
  };
  return (
    <div>
      <div>
        {video.title}
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button onClick={() => handleDeletedVideo(video.id)}>Delete</button>
        <img
          src={ThumbsImage}
          onClick={incrementCount}
          alt=""
          width="100px"
          height="80px"
        />
        {count} votes
        <img
          src={thumbsDown}
          onClick={decrementCount}
          alt=""
          width="100px"
          height="80px"
        />
      </div>
    </div>
  );
};
export default RenderVideo;