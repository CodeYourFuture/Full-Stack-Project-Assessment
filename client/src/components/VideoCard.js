import React from "react";

// add onClick for upvote and downvote
export default function VideoCard(props) {
  const videoId = props.url.split("watch?v=")[1];

  function handleUpVote() {
    props.handleVote(props.id, 1);
  }

  function handleDownVote() {
    props.handleVote(props.id, -1);
  }

  function handleDelete() {
    props.handleDelete(props.id);
  }

  return (
    <div className="video--card">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h2 className="video--h2">{props.title}</h2>
      <div className="video--buttons">
        <div className="video--votes">
          <span onClick={handleUpVote} className="thumbs--up">
            👍
          </span>
          Likes: {props.voteCount}
          <span onClick={handleDownVote} className="thumbs--down">
            👎
          </span>
        </div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
