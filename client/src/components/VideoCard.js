import React, { useState } from "react";

const Card = ({ data,onDelete }) => {
  const [votes, setVotes] = useState(0);
  const id = data.url.substring(data.url.indexOf("=") + 1);
  let title = data.title;
  if (title.length > 30) {
    title = `${title.substring(0, 30)}...`;
  }
  // EVENT HANDLERS
  const removeVideo = (event) => {
    event.preventDefault();
    const videoId = Number(event.target.parentNode.parentNode.id);
    onDelete(videoId);
  };

  const voteUpOrDown = (e) => {
    e.target.id === "vote-up" ? setVotes(votes + 1) : setVotes(votes - 1);
  };

  return (
    <div id={data.id} className="card">
      <h4 className="title">{title}</h4>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="controls">
        <div className="votes">
          <span id="num-votes">{votes}</span>{" "}
          <span
            id="vote-up"
            className="fas fa-thumbs-up"
            onClick={voteUpOrDown}
          ></span>
          <span
            id="vote-down"
            className="fas fa-thumbs-down"
            onClick={voteUpOrDown}
          ></span>
        </div>
        <button id="remove" onClick={removeVideo}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default Card;
