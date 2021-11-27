import React from "react";
import Buttons from "./Buttons";
import videos from "./exampleresponse.json";

const VideoCards = () => {
  return (
    <div className="card-group">
      {videos.map((video, index) => (
        <div className="card">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
            title={video.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            key={index}
          ></iframe>

          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
          </div>
          <div>
            <Buttons />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCards;
