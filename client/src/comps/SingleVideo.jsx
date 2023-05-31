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
    <div className="single-video-card">
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
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default SingleVideo;
