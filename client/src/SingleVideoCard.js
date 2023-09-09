import React, { useState } from "react";

function SingleVideoCard({ title, url, rating, deleteVideo }) {
  const [count, setCount] = useState(rating);

  function minusCount() {
    setCount((prevCount) => prevCount - 1);
  }

  function plusCount() {
    setCount((prevCount) => prevCount + 1);
  }
  if (!url) {
    return <div>No video URL provided.</div>;
  }

  const urlId = url.includes("v=") ? url.split("v=")[1].substring(0, 11) : "";
  return (
    <>
      <div className="card">
        <iframe
          className="card-thumb"
          width="320"
          height="320"
          src={`https://www.youtube.com/embed/${urlId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="card-body">
          <button className="counting" onClick={minusCount}>
            -
          </button>
          <span>{count}</span>
          <button className="counting" onClick={plusCount}>
            +
          </button>
          <h5>{title}</h5>

          <button className="btn btn-primary" onClick={deleteVideo}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
export default SingleVideoCard;
