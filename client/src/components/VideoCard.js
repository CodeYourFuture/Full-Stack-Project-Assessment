import React, { useEffect, useState } from "react";
import {
  getFormattedDate,
  removeVideoFromServer,
  updateVideoRatingOnServer,
} from "../functions";

const Card = (props) => {
  const [numVotes, setVotes] = useState();

  const componentId = props.data.id;
  const videoId = props.data.url.substring(props.data.url.indexOf("=") + 1);
  let title = props.data.title;
  if (title.length > 30) {
    title = `${title.substring(0, 30)}...`;
  }
  const datePosted = getFormattedDate(props.data.date_posted);
  // SIDE EFFECT
  useEffect(() => {
    setVotes(props.data.rating);
  }, [props.data.rating]);

  // EVENT HANDLERS
  const removeVideo = async (event) => {
    event.preventDefault();
    removeVideoFromServer(componentId);
  };
  const handleVoting = async (plusOrMinusOne) => {
    const newRating = numVotes + plusOrMinusOne;

    const status = await updateVideoRatingOnServer(componentId, newRating);
    if (status === 200) {
      setVotes(newRating);
    }
  };

  return (
    <div id={componentId} className="card">
      <p className="video-title">{title}</p>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="controls">
        <Votes onVoteClicked={handleVoting} votes={numVotes} />
        <button
          className="remove"
          aria-label="button-remove"
          onClick={removeVideo}
        >
          Remove
        </button>
      </div>
      <div className="info">
        <span >Added on:{" "}{datePosted}</span>
      </div>
    </div>
  );
};
export default Card;

export const Votes = (props) => {
  const voteUpOrDown = async (event) => {
    let plusOrMinusOne = 0;
    event.target.className.toString().includes("thumbs-up")
      ? (plusOrMinusOne = 1)
      : (plusOrMinusOne = -1);
    props.onVoteClicked(plusOrMinusOne);
  };
  return (
    <div className="votes">
      <button className="vote vote-up" aria-label="button-vote-up">
        <span className="fas fa-thumbs-up" onClick={voteUpOrDown}></span>
      </button>{" "}
      <span className="num-votes">{props.votes}</span>{" "}
      <button className="vote vote-down" aria-label="button-vote-down">
        <span className="fas fa-thumbs-down" onClick={voteUpOrDown}></span>
      </button>
    </div>
  );
};
