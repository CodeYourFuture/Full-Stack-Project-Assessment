import React from "react";

function Video({ video, onDelete, onUpVote, onDownVote }) {
  const { title, url, rating } = video;
  const videoId = new URL(url).searchParams.get("v");

  return (
    <div className="card mt-3 col-sm-6 mx-3">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div className="mt-2">
          <span>Votes: {rating}</span>
          <button
            className="btn btn-success ml-3"
            onClick={() => onUpVote(video)}
          >
            Up Vote
          </button>
          <button
            className="btn btn-danger ml-3"
            onClick={() => onDownVote(video)}
          >
            Down Vote
          </button>
          <button
            className="btn btn-secondary ml-3"
            onClick={() => onDelete(video)}
          >
            Remove Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default Video;
