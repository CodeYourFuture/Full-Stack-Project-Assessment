import React from "react";
import "./VideoComponent.css";

const VideoComponent = ({ video, onRemove, onUpvote, onDownvote }) => {
  const { id, title, url, rating } = video;

  const handleRemoveClick = async () => {
    await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    onRemove(id);
  };

  const handleVoteClick = async (vote) => {
    const isUpVote = vote === "upVote";

    await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isUpVote }),
    });

    if (isUpVote) {
      onUpvote(id);
    } else {
      onDownvote(id);
    }
  };

  return (
    <div>
      <div className="video-card">
        <h2 className="video-title">{title}</h2>
        <div className="video-player">
          <iframe
            width="560"
            height="315"
            src={url.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="video-rating">Votes: {rating}</p>
        <button className="remove-button" onClick={handleRemoveClick}>
          Remove
        </button>
        <button
          className="upvote-button"
          onClick={() => {
            handleVoteClick("upVote");
          }}
        >
          Up Vote
        </button>
        <button
          className="downvote-button"
          onClick={() => {
            handleVoteClick("downVote");
          }}
        >
          Down Vote
        </button>
      </div>
    </div>
  );
};

export default VideoComponent;
