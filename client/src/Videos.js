import React from "react";

function Video(props) {
    const videoUrl = props.videoObj.url.replace("watch?v=", "embed/");

    return (
      <div className="videos">
        {/* delete button */}
        <div className="remove-button-container">
          <button onClick={props.removeVideo} className="btn remove-button">
            Remove
          </button>
        </div>

        {/* embedded video */}
        <div className="embed-responsive embed-responsive-16by9 embed-responsive-item">
          <iframe
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={props.videoObj.title}
          />
        </div>
      </div>
    );
}

export default Video;