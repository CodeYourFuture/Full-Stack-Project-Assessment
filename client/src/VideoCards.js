import React from "react";

function VideoCards() {
  return (
    <div className="card-container">
      <div className="card">
        <iframe
          width="320"
          height="320"
          src="https://www.youtube.com/embed/{DAOZJPquY_w}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div className="card-body">
          <h2>Video Title</h2>
          <p>Paragraph</p>
          <a href="~" className="btn btn-primary">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
export default VideoCards;
