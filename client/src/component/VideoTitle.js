import React from "react";

const VideoTitle = ({ video }) => {
  return (
    <div>
      <h2>{video.title}</h2>
      <div>
        <i className="fas fa-thumbs-up vote">&#128077;</i>
        <button>Like {video.rating}</button>
        <p>Votes</p>
        <i className="fas fa-thumbs-down vote">&#128078;</i>
        <button>Dislike{video.rating}</button>
      </div>
      <br />

      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <br />
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};

export default VideoTitle;
