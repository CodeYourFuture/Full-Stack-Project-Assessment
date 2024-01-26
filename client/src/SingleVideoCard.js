import React, { useState } from "react";

function SingleVideoCard({ id, title, url, rating, deleteVideo }) {
  const [count, setCount] = useState(rating);
  const urlAPI = process.env.REACT_APP_BACKEND_URL;

  // function minusCount() {
  //   setCount((prevCount) => prevCount - 1);
  // }

  // function plusCount() {
  //   setCount((prevCount) => prevCount + 1);
  // }

  async function updateRating(newRating, videoId) {
    try {
      const response = await fetch(`${urlAPI}/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
      });
      console.log(newRating, videoId);

      if (response.ok) {
        setCount(newRating); // Update the local rating state
      } else {
        console.error("Error updating rating:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  }

  function minusCount(videoId) {
    const newRating = count - 1;
    updateRating(newRating, videoId);
    console.log(videoId);
  }

  function plusCount(videoId) {
    const newRating = count + 1;
    updateRating(newRating, videoId);
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
          <button className="counting" onClick={() => minusCount(id)}>
            -
          </button>
          <span>{count}</span>
          <button className="counting" onClick={() => plusCount(id)}>
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
