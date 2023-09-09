import React from "react";

function Video(props) {
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

        <iframe title={props.title} src={`https://www.youtube.com/embed/${props.url}`} frameBorder="5" width="100%" height="315" />

        <button className="btn btn-sm btn-outline-secondary" onClick={() => props.onDelete(props.id)}>
          Delete
        </button>
        <h6>{props.title}</h6>
      </div>
    </div>
  );
}

export default Video;
