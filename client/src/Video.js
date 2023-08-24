import React from "react";

function Video(props) {
  const regex = /v=([^&]+)/;
  let movieSrc = null;

  if (props.url.includes("youtube.com/watch?v=")) {
    const match = props.url.match(regex);
    movieSrc = match ? match[1] : null;
  } else {
    movieSrc = props.url;
  }

  // const movieName = props.url.split("watch?v=")[1];
  // const movieSrc = "https://www.youtube.com/embed/" + movieName;

  function handleUpVote() {
    props.onVote(props.id, "up");
  }

  function handleDownVote() {
    props.onVote(props.id, "down");
  }

  // Get just the video ID from URL
  // const videoId = props.url.split("=")[1];
  // const regex = /v=([^&]+)/;
  // const result = regex.exec(props.url);
  // const videoId = result ? result[1] : null;

  // const regex = /v=(.{11})/;

  // const match = props.url.match(regex);

  // const videoId = match[1];

  // const videoId = getVideoId(props.url);

  // // Helper function to get ID from URL
  // function getVideoId(url) {
  //   if (!props.url) {
  //     const urlParts = url.split("?v=")[1];
  //     return urlParts[1];
  //   } else {
  //   }
  // }

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
          src={movieSrc}
          title={props.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {/* <iframe title={props.title} src={movieSrc} frameBorder="0" width="100%" height="315"></iframe> */}

        <button className="btn btn-sm btn-outline-secondary" onClick={() => props.onDelete(props.id)}>
          Delete
        </button>
        <h6>{props.title}</h6>
      </div>
    </div>
  );
}

export default Video;
