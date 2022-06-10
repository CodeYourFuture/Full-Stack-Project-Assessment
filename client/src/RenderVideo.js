import React, { useState } from "react";
import ThumbsImage from "../src/images/ThumbsImage.png";
import thumbsDown from "../src/images/thumbsDown.png";



const RenderVideo = ({ video, handleDeletedVideo }) => {
  const [count, setCount] = useState(video.rating);

  //This increaments the like button
  const incrementCount = () => {
    setCount(count + 1);
  };
//This decrements the dislike button
  const decrementCount = () => {
    setCount(count - 1);
  };
  return (
    <section className="video-section">
      <div className="video-container">
        <h5> {video.title} </h5>
        <img
          className="img-fluid"
          src={ThumbsImage}
          onClick={incrementCount}
          alt="thumbs-up"
          width="80px"
        />
        {count} votes
        <img
          className="img-fluid"
          src={thumbsDown}
          onClick={decrementCount}
          alt="thumbs-down"
          width="80px"
        />
        <iframe
          className="embed-responsive-item"
          src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          onClick={() => handleDeletedVideo(video.id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </section>
  );
};
export default RenderVideo;