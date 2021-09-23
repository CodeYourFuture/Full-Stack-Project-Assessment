import React, { useState } from "react";

const SingleVideo = ({ video }) => {
  const [counter, setCounter] = useState(0);

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
          <button onClick={() => voteUp()}>Vote Up </button>
          <h4>{counter}</h4>
          <button onClick={() => voteDown()}>Vote Down</button>
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
      <div>
        <button className="btn btn-danger input" type="submit">
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleVideo;
