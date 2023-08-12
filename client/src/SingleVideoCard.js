import React, { useState } from "react";
import exampleResponse from "./exampleResponse.json";

function SingleVideoCard({ title, url, key }) {
  const [count, setCount] = useState(0);
  const [filterVideos, setFilterVideos] = useState(exampleResponse);

  function minusCount() {
    setCount((prevCount) => prevCount - 1);
  }
  function plusCount() {
    setCount((prevCount) => prevCount + 1);
  }

  // const deleteVideo = (key) => {
  //   const videoToDelete = filterVideos[key]; // setting variable to video id
  //   setFilterVideos((filterVideos) =>
  //     filterVideos.filter((key) => key !== videoToDelete)
  //   );
  // };

  const deleteVideo = () => {
    const updatedVideos = filterVideos.filter((video) => video.id !== key);
    setFilterVideos(updatedVideos);
  };

  // const initialState = [
  //   { id: 1, name: "Banana", amount: 5 },
  //   { id: 2, name: "Apple", amount: 6 },
  // ];
  // const removeSecond = () => {
  //   setFruits((current) => current.filter((fruit) => fruit.id !== 2));
  // };
  // const [fruits, setFruits] = useState(initialState);

  const urlId = url.split("v=")[1].substring(0, 11);
  console.log("Extracted Video ID:", urlId);

  return (
    <div className="card-container">
      <div className="card">
        <iframe
          className="card-thumb"
          width="320"
          height="320"
          src={`https://www.youtube.com/embed/${urlId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div className="card-body">
          <button onClick={minusCount}>-</button>
          <span>{count}</span>
          <button onClick={plusCount}>+</button>
          <h2>{title}</h2>
          <p>Paragraph</p>
          <button className="btn btn-primary" onClick={() => deleteVideo(key)}>
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
