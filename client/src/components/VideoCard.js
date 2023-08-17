import React from "react";

// add onClick for upvote and downvote
export default function VideoCard(props) {
  const videoId = props.url.split("watch?v=")[1];

  function handleUpVote() {
    props.changeVoteScore(1);
  }

  function handleDownVote() {
    props.changeVoteScore(-1);
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
        <span onClick={handleUpVote} className="thumbs--up">
          👍
        </span>
        Vote Score: {props.voteCount}
        <span onClick={handleDownVote} className="thumbs--down">
          👎
        </span>
      </p>
      <button>Delete</button>
    </div>
  );
}
