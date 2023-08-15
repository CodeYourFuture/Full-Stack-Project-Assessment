import React, { useState } from "react";
// import exampleResponse from "./exampleResponse.json";

function SingleVideoCard({
  videoId,
  filterVideos,
  setFilterVideos,
  title,
  url,
}) {
  const [count, setCount] = useState(0);

  function minusCount() {
    setCount((prevCount) => prevCount - 1);
  }
  function plusCount() {
    setCount((prevCount) => prevCount + 1);
  }

  const deleteVideo = (videoId) => {
    const updatedVideos = filterVideos.filter((video) => video.id !== videoId);
    setFilterVideos(updatedVideos);
  };

  const urlId = url.split("v=")[1].substring(0, 11);

  return (
    <div className="card-container">
      <div className="card">
        <iframe
          className="card-thumb"
          width="320"
          height="320"
          src={`https://www.youtube.com/embed/${urlId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="card-body">
          <button onClick={minusCount}>-</button>
          <span>{count}</span>
          <button onClick={plusCount}>+</button>
          <h3>{title}</h3>
          <p>Paragraph</p>
          <button className="btn-delete" onClick={() => deleteVideo(videoId)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default SingleVideoCard;

// {
//     "id": 523523,
//     "title": "Never Gonna Give You Up",
//     "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     "rating": 23
//   },
