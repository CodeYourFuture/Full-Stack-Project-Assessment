import React from "react";
import Youtube from "react-youtube";
import "./Video.css";

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
      <div>Votes:{votes}</div>
      <div className="votes_btn_wrap">
        <button onClick={onUpVote} className="up_vote">
          ♡
        </button>
        <button onClick={onDownVote} className="down_vote">
          💔
        </button>
        <button onClick={onRemove} className="delete">
          ␡
        </button>
      </div>
    </>
  );
};

export default Video;
