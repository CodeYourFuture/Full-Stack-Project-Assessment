import React from "react";
import Rating from "./Rating";

export default function VideoCards({ videoList, removeVideo }) {
  return (
    <div className="grid-container">
      {videoList.map((element, index) => (
        <span key={index} className="card">
          <iframe
            width="560"
            height="315"
            src={
              "https://www.youtube.com/embed/" +
              element.url.replace("https://www.youtube.com/watch?v=", "")
            }
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>{" "}
          <div className="card-body">
            <h4>{element.title}</h4>
            <Rating rating={element.rating} />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                removeVideo(element.id);
              }}
            >
              Remove video
            </button>
          </div>
        </span>
      ))}
    </div>
  );
}
