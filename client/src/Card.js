import React from "react";
import ReactPlayer from "react-player";
import Votes from "./Voting";

const Card = ({ id, title, url, rating, index, removeElement }) => {
  return (
    <div
      key={id}
      title={title}
      url={url}
      id={id}
      rating={rating}
      className="card"
    >
      <div className="video">
        <ReactPlayer className="video" width={350} height={320} url={url} />
      </div>
      <div className="card-body">
        <h4>{title}</h4>
        <p className="Video-Rating">YouTube Rating: {rating}</p>
        <Votes />
        <a href={url} className="btn btn-primary">
          🎞️
        </a>
        <button className="deleteVideo" onClick={() => removeElement(id)}>
          ❌
        </button>
      </div>
    </div>
  );
};

export default Card;
