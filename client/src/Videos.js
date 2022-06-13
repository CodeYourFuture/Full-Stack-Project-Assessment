import React from "react";
// import videosData from "./exampleresponse.json";

function Video(props) {
    const videoUrl = props.videoObj.url.replace("watch?v=", "embed/");

    return (
      <div className="video-container">
        {/* embedded video */}
        <div className="video">
          <iframe
            width="450"
            height="300"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={props.videoObj.title}
          />
        </div>

        {/* delete button */}
        <div className="delete-button-container">
          <button onClick={props.removeVideo} className="delete-button">
            Remove
          </button>
        </div>
      </div>
    );
}

export default Video;