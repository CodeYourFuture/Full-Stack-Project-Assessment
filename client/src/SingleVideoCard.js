import React, { useState } from "react";

function SingleVideoCard({ title, url }) {
  const [count, setCount] = useState(0);

  function minusCount() {
    setCount((prevCount) => prevCount - 1);
  }

  function plusCount() {
    setCount((prevCount) => prevCount + 1);
  }
  if (!url) {
    return <div>No video URL provided.</div>;
  }

  const videoId = url.split("v=")[1];
  return (
    <div className="card-container">
      <div className="card">
        <iframe
          className="card-thumb"
          width="320"
          height="320"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="card-body">
          <button onClick={minusCount}>-</button>
          <span>{count}</span>
          <button onClick={plusCount}>+</button>
          <h2>{title}</h2>
          <p>Paragraph</p>
          <button className="btn btn-primary">Delete</button>
        </div>
      </div>
    </div>
  );
}
export default SingleVideoCard;
