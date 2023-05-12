import { useState, React } from "react";
import data from "./exampleresponse.json";
import "./VideosCards.css";

export const VideosCards = () => {
  const [getID, setGetID] = useState(null);

  const handleDeleteClick = (id) => {
    setGetID(id);
    return (data = data.filter((video) => video.id !== id));
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
        <p>{v.rating}</p>
        <button onClick={() => handleDeleteClick(v.id)}>Delete Video</button>
      </div>
    );
  };

  return (
    <div className="allCardsContainer">{data.map((video) => Card(video))}</div>
  );
};
