import React, { useState } from "react";
import thumbUp from "../src/images/thumbUp.png";
import thumbDown from "../src/images/thumbDown.png";


const RenderVideo = ({ video, handleDeletedVideo }) => {
    const [count, setCount] = useState(0);

    //Increasing Like Button
    const increasingCount = () => {
        setCount(count + 1);
    };

// Decreasing like button
const decreasingCount = () => {
    setCount(count -1);
};

return (
  <div>
    <div>
      {video.title}
      <iframe
        width="500"
        height="300"
        src={`http://www.youtube.com/embed/${video.url.split("v=")[1]}`}
        title="Video Player"
        frameBorder="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button onClick={() => handleDeletedVideo(video.id)}>Delete</button>
      <img
        src={thumbUp}
        onClick={increasingCount}
        alt=""
        width="50px"
        height="40px"
      />
      {count} votes

      <img
        src={thumbDown}
        onClick={decreasingCount}
        alt=""
        width="50px"
        height="40px"
      />
    </div>
  </div>
);
};

export default RenderVideo;