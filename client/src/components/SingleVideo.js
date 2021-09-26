import React, { useState } from "react";

const SingleVideo = ({ video, handleDelete }) => {
  const [counter, setCounter] = useState(video.rating);

  const voteUp = () => {
    setCounter(counter + 1);
  };
  const voteDown = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <div>
        <h4>{video.title}</h4>
        <div className="vote d-flex justify-content-center">
          <i className="fa fa-thumbs-o-up thumps" onClick={() => voteUp()}></i>
          <h5 className="mx-3">{counter} Votes</h5>
          <i
            className="fa fa-thumbs-o-down thumps"
            onClick={() => voteDown()}
          ></i>
        </div>
      </div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="delete d-flex justify-content-center">
        <button
          onClick={() => handleDelete(video.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleVideo;
