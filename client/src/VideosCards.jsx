import { useState, React } from "react";
import data from "./exampleresponse.json";
import "./VideosCards.css";

export const VideosCards = () => {
  const [getID, setGetID] = useState(null);
  const [videos, setVideos] = useState(data);

  const handleDeleteClick = (id) => {
    setGetID(id);
    let newData = [];
    newData = data.filter((video) => video.id !== id);
    return setVideos(newData);
  };

  const increaseRating = (id) => {
    let newData = [];
    newData = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating + 1 } : video
    );
    return setVideos(newData);
  };

  const decreaseRating = (id) => {
    let newData = [];
    newData = videos.map((video) =>
      video.id === id ? { ...video, rating: video.rating - 1 } : video
    );
    return setVideos(newData);
  };

  const Card = (v) => {
    return (
      <div className="cardContainer" key={v.id}>
        <iframe
          height="240"
          src={v.url.replace("watch?v=", "embed/")}
          title={v.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h6>{v.title}</h6>
        <p>
          Rating:
          {v.rating}
        </p>
        <span className="UpDownVote">
          <i class="fa fa-thumbs-up" onClick={() => increaseRating(v.id)}></i>|
          <i class="fa fa-thumbs-down" onClick={() => decreaseRating(v.id)}></i>
        </span>

        <button
          className="deleteButton"
          onClick={() => handleDeleteClick(v.id)}
        >
          Delete Video
        </button>
      </div>
    );
  };

  return (
    <div className="allCardsContainer">
      {videos.map((video) => Card(video))}
    </div>
  );
};
