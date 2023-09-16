import React, { useState } from "react";

function SingleVideoCard({ title, url, rating, deleteVideo }) {
  const [count, setCount] = useState(rating);
  const urlAPI = process.env.REACT_APP_BACKEND_URL;

  // function minusCount() {
  //   setCount((prevCount) => prevCount - 1);
  // }

  // function plusCount() {
  //   setCount((prevCount) => prevCount + 1);
  // }

  async function updateRating(newRating) {
    try {
      const response = await fetch(`${urlAPI}/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating }),
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        setCount(updatedVideo.rating); // Update the local rating state
      } else {
        console.error("Error updating rating:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  }

  function minusCount() {
    const newRating = count - 1;
    updateRating(newRating);
  }

  function plusCount() {
    const newRating = count + 1;
    updateRating(newRating);
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
