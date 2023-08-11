import React, { useState } from "react";

function VideoCard() {
  const [count, setCount] = useState(0);

  function minusCount() {
    setCount((prevCount) => prevCount - 1);
  }

  function plusCount() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="card-container">
      <div className="card">
        <iframe
          className="card-thumb"
          width="320"
          height="320"
          src="https://www.youtube.com/embed/{DAOZJPquY_w}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div className="card-body">
          <button onClick={minusCount}>-</button>
          <span>{count}</span>
          <button onClick={plusCount}>+</button>
          <h2>Video Title</h2>
          <p>Paragraph</p>
          <button className="btn btn-primary">Delete</button>
        </div>
      </div>
    </div>
  );
}
export default VideoCard;
