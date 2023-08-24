import React from "react";

function Video(props) {
  // const regex = /v=([^&]+)/;
  // let movieSrc = null;

  // const movieName = props.url.split("watch?v=")[1];
  const videoSrc = "https://www.youtube.com/embed/" + props.url;
  // const videoSrc = "https://www.youtube.com/embed/" + props.url;

  function handleUpVote() {
    props.onVote(props.id, "up");
  }

  function handleDownVote() {
    props.onVote(props.id, "down");
  }

  return (
    <div className="col col-xl-3 col-md-6 mb-4">
      <div className="card-body text-center">
        <div className="d-flex justify-content-between align-items-center">
          {" "}
          <div className="btn-group">
            <button className="btn btn-sm btn-outline-secondary" onClick={handleUpVote}>
              Up Vote
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleDownVote}>
              Down Vote
            </button>
            <p className="btn btn-sm btn-outline-secondary">Votes: {props.rating}</p>
          </div>
        </div>

        <iframe
          width="100%"
          height="315"
          src={videoSrc}
          title={props.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <button className="btn btn-sm btn-outline-secondary" onClick={() => props.onDelete(props.id)}>
          Delete
        </button>
        <h6>{props.title}</h6>
      </div>
    </div>
  );
}

export default Video;
