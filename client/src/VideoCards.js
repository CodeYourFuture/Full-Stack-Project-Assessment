import React from "react";
import data from "./exampleresponse.json";

export default function VideoCards() {
  let videos = data;
  return (
    <div className="d-flex justify-content-center">
      {videos.map((element, index) => (
        <span key={index} className="card">
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + element.vid}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>{" "}
          <div className="card-body">
            <p>{element.title}</p>
            <p>{element.rating}</p>
            <button type="button" className="btn btn-primary">
              Up Vote
            </button>
            <button type="button" className="btn btn-primary">
              Down Vote
            </button>
            <button type="button" className="btn btn-primary">
              Remove
            </button>
          </div>
        </span>
      ))}
    </div>
  );
}
