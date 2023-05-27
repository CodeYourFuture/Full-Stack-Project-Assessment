import React, { useState } from "react";
import "../styles/SingleVideo.css";

function SingleVideo(props) {
  const [likes, setLikes] = useState(props.rating);

  function handleLikes() {
    setLikes((rating) => rating + 1);
  }

  function handleUnlikes() {
    setLikes((rating) => rating - 1);
  }

  return (
    <div className="single-video-container">
      <h4>{props.title}</h4>
      <div className="ratings-container">
        <p>Likes: {likes}</p>
        <div className="emoji-container">
          <p className="rating-emoji" onClick={handleLikes}>
            👍
          </p>
          <p className="rating-emoji" onClick={handleUnlikes}>
            👎
          </p>
        </div>
      </div>
      <iframe
        width="400"
        height="215"
        src={props.url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <button className="delete-video-button">
        Delete video
      </button>
    </div>
  );
}

export default SingleVideo;
