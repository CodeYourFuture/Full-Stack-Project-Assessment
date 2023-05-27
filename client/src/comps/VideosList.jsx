import React from "react";
import "../styles/VideosList.css";
import data from "../data.json";
import SingleVideo from "./SingleVideo";

function VideosList() {
  return (
    <div className="videos-list-container">
      <h3>Your Videos:</h3>
      <div className="your-videos-container">
        {data.map((vid) => (
          <SingleVideo
            title={vid.title}
            src={`https://www.youtube.com/embed/${vid.url.slice(32)}`}
            rating={vid.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default VideosList;
