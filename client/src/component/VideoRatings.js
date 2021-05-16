import React from "react";

const VideoRatings = ({ rating }) => {
  return (
    <div className="votes">
      <button className="btn btn-success">
        <i className="fas fa-thumbs-up vote">&#128077;</i>
      </button>
      <p>Votes</p>

      <button className="btn btn-success">
        <i className="fas fa-thumbs-down vote">&#128078;</i>
      </button>
    </div>
  );
};

export default VideoRatings;
