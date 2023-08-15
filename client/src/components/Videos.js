import React from "react";

function Video({ videoObj, removeVideo }) {
  const videoUrl = videoObj?.url?.replace("watch?v=", "embed/");

  return (
    <div className="videos">
      <div className="remove-button-container">
        <button onClick={removeVideo} className="btn remove-button">
          Remove
        </button>
      </div>

      <div className="embed-responsive embed-responsive-16by9 embed-responsive-item">
        <iframe
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={videoObj.title}
        />
      </div>
    </div>
  );
}

export default Video;