import React from "react";
import "./Video.css";

const Video = ({ title, url, rating, onUpVote, onDownVote, onRemove }) => {
  return (
    <div className="video_wrapper">
      <h2 className="video_title">Title:{title}</h2>
      <iframe
        width="560"
        height="315"
        src={url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div>Votes:{rating}</div>
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
    </div>
  );
};

export default Video;
