import React from "react";
import exampleresponse from "./exampleresponse.json";
import ReactPlayer from "react-player";

const MiniYoutube = () => {
  return (
    <div className="display-wrapper">
      {exampleresponse.map((response) => {
        return (
          <div className="video-and-title">
            <h3>{response.title}</h3>
            <div className="video-container">
              <ReactPlayer
                width="560"
                height="315"
                className="embedded-video"
                url={response.url.toString()}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MiniYoutube;