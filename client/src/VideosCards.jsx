import React from "react";
import data from "./exampleresponse.json";

export const VideosCards = () => {
  const Card = (v) => {
    return (
      <div className="cardContainer" key={v.id}>
        <iframe
          src={v.url.replace("watch?v=", "embed/")}
          title={v.title}
        ></iframe>

        <h1>{v.title}</h1>
        <p>{v.rating}</p>
      </div>
    );
  };

  return (
    <div className="allCardsContainer">{data.map((video) => Card(video))}</div>
  );
};
