import React, { useEffect, useState } from "react";
import {
  fetchSingleVideoData,
  removeVideoFromServer,
  updateVideoRatingOnServer,
} from "../functions";

const Card = (props) => {
  const [cardIsUpdated, setCardIsUpdated] = useState(false);
  const [numVotes, setVotes] = useState();

  const componentId = props.data.id;
  const videoId = props.data.url.substring(props.data.url.indexOf("=") + 1);
  let title = props.data.title;
  if (title.length > 30) {
    title = `${title.substring(0, 30)}...`;
  }
  // SIDE EFFECT
  useEffect(() => {
    if (cardIsUpdated) {
      const response = fetchSingleVideoData(componentId);
      if (response) {
        response.then((data) => setVotes(data.rating));
      }
      setCardIsUpdated(false);
      return;
    } else {
      setVotes(props.data.rating);
    }
  }, [props.data.rating, cardIsUpdated, componentId]);

  // EVENT HANDLERS
  const removeVideo = (event) => {
    event.preventDefault();
    removeVideoFromServer(componentId);
  };
  const handleVoting = async (plusOrMinus) => {
    const status = await updateVideoRatingOnServer(componentId, plusOrMinus);
    if (status === 200) {
      setCardIsUpdated(true);
    }
  };

  return (
    <div id={componentId} className="card">
      <p className="title">{title}</p>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
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
    </div>
  );
};
export default Card;

export const Votes = (props) => {
  const voteUpOrDown = async (event) => {
    let plusOrMinus = "";
    event.target.className.toString().includes("thumbs-up")
      ? (plusOrMinus = "plus")
      : (plusOrMinus = "minus");
    props.onVoteClicked(plusOrMinus);
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
