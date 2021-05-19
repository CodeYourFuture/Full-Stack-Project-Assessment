import React, { useState } from "react";
import { removeVideoFromServer, updateVideoRatingOnServer } from "../functions";

const Card = ({ data }) => {
  const [votes, setVotes] = useState(data.rating);
  const id = data.url.substring(data.url.indexOf("=") + 1);
  let title = data.title;
  if (title.length > 30) {
    title = `${title.substring(0, 30)}...`;
  }
  // EVENT HANDLERS
  const removeVideo = (event) => {
    event.preventDefault();
    const videoId = Number(data.id);
    removeVideoFromServer(videoId);
  };

  const voteUpOrDown = (event) => {
    const videoId = Number(data.id);
    let numVotes = 0;
    event.target.className === "vote-up"
      ? (numVotes = votes + 1)
      : (numVotes = votes - 1);
    setVotes(numVotes);
    updateVideoRatingOnServer(videoId, numVotes);
  };

  return (
    <div id={data.id} className="card">
      <p className="title">{title}</p>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="controls">
        <div className="votes">
          <button className="vote vote-up" aria-label="button-vote-up">
            <span className="fas fa-thumbs-up" onClick={voteUpOrDown}></span>
          </button>{" "}
          <span className="num-votes">{votes}</span>{" "}
          <button className="vote vote-down" aria-label="button-vote-down">
            <span className="fas fa-thumbs-down" onClick={voteUpOrDown}></span>
          </button>
        </div>
        <button className="remove" aria-label="button-remove" onClick={removeVideo}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default Card;