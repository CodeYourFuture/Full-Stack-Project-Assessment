import React, { useState } from "react";
import thumbUp from "../src/images/thumbUp.png";
import thumbDown from "../src/images/thumbDown.png";


const RenderVideo = ({ video, urlToFetch, createVideo }) => {
    const [count, setCount] = useState(video.rating);

    //Increasing Like Button
    const increasingCount = () => {
        setCount(count + 1);
    };

// Decreasing like button
const decreasingCount = () => {
    setCount(count -1);
};

const deleteVideos = async (e) => {
  const videoId = video.id;
  const res = await fetch(`${urlToFetch}${videoId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log(data.msg);
  createVideo();
};

return (
  <section className="video">
    <div>
      <div className="title">
        <h3>{video.title}</h3>
        <iframe
          width="500"
          height="300"
          src={`http://www.youtube.com/embed/${video.url.split("v=")[1]}`}
          title="Video Player"
          frameBorder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
  
        <button onClick={deleteVideos} type = "button" className="btn btn-danger">Delete</button>
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
  </section>
);
};

export default RenderVideo;