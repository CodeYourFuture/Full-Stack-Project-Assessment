import React from "react";
import "./Video.css";
import Card from "./Card";

function Video({ videos, onDelete }) {
  return (
    <div className="video">
      {videos.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title.trim() !== "" ? card.title : "There is no title"}
          url={card.url}
          rating={card.rating}
          uploadedAt={card.uploadedAt}
          onDelete={onDelete} // Pass onDelete prop
        />
      ))}
    </div>
  );
}

export default Video;