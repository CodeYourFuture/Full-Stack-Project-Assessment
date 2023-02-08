import React from "react";

export default function VideoCards(props) {

  

  return (
    <div className="d-flex justify-content-center">
      { props.videoList.map((element, index) => (
        <span key={index} className="card">
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + element.url.replace("https://www.youtube.com/watch?v=","")}
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
