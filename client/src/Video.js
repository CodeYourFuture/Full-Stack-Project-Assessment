import React from "react";
import Youtube from "react-youtube";


const Video = ({ title, url, votes, onUpVote, onDownVote, onRemove }) => {
  return (
    <>
      <h2>Title:{title}</h2>
      <Youtube
        width="560"
        height="315"
        src={url}
        title={title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></Youtube>
      <div>Votes :{votes}</div>
      <button onClick={onUpVote}>Up vote</button>
      <button onClick={onDownVote}>Down vote</button>
      <button onClick={onRemove}>Remove video</button>
    </>
  );
};

export default Video;
