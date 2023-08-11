import React from "react";

const Main = () => {
  return (
    <div className="container">
      <div className="video-card">
        <img
          className="video-thumbnail"
          src="video1.jpg"
          alt="Video Thumbnail"
        />
        <div className="video-info">
          <h2 className="video-title">Video Title 1</h2>
          <p className="video-category">Category 1</p>
          <div className="video-likes-dislikes">
            <span className="like-button">👍</span>
            <span className="dislike-button">👎</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
