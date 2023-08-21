// Video.js

import React from "react";

function Video(props) {
  function handleUpVote() {
    props.onVote(props.id, 1);
  }

  function handleDownVote() {
    props.onVote(props.id, -1);
  }

  // Get just the video ID from URL
  const videoId = getVideoId(props.url);

  // Helper function to get ID from URL
  function getVideoId(url) {
    const urlParts = url.split("?v=");
    return urlParts[1];
  }

  return (
    <div class="col col-xl-3 col-md-6 mb-4">
      <div class="card-body text-center">
        <div class="d-flex justify-content-between align-items-center">
          {" "}
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-secondary" onClick={handleUpVote}>
              Up Vote
            </button>
            <button class="btn btn-sm btn-outline-secondary" onClick={handleDownVote}>
              Down Vote
            </button>
            <p class="btn btn-sm btn-outline-secondary">Votes: {props.rating}</p>
          </div>
        </div>

        <iframe title={props.title} src={`https://www.youtube.com/embed/${videoId}`} frameBorder="5" width="100%" height="315" />

        <button class="btn btn-sm btn-outline-secondary" onClick={() => props.onDelete(props.id)}>
          Delete
        </button>
        <h6>{props.title}</h6>
      </div>
    </div>
  );
}

export default Video;
