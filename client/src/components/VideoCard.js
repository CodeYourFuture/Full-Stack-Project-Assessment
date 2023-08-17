import React, { useState } from "react";

// add onClick for upvote and downvote
export default function VideoCard(props) {
  const videoId = props.url.split("watch?v=")[1];

  const [voteCount, setVoteCount] = useState(props.voteCount);

  function handleLike() {
    setVoteCount((prevCount) => prevCount + 1);
  }

  function handleUnlike() {
    setVoteCount((prevCount) => prevCount - 1);
  }

  return (
    <div className="video--card" key={props.id}>
      <h2>{props.title}</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>
        <span onClick={handleLike} className="thumbs--up">
          👍
        </span>
        Vote Score: {voteCount}
        <span onClick={handleUnlike} className="thumbs--down">
          👎
        </span>
      </p>
      <button>Delete</button>
    </div>
  );
}
