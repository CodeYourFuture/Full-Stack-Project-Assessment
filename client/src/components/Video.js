import React, { useState } from "react";
import smileyFace from "../smiley-face.png";
import downVoteFace from "../downvote-face.png";

function Video({ item, onRemove }) {
  const [count, setCount] = useState(item.rating);

  function add() {
    setCount((prevCount) => prevCount + 1);
  }

  function subtract() {
    setCount((prevCount) => prevCount - 1);
  }

  const extractedUrl = item.url.slice(-11);
  return (
    <div>
      <div className="video">
        <hr />
        <h2>{item.title}</h2>
        <div className="votes">
          <div className="vote">
            <img src={smileyFace} alt="up vote" id="smiley-face" />
            <button id="upvote" onClick={add}>
              up vote
            </button>
          </div>

          <p className="rating">{count}</p>
          <div className="vote">
            <img src={downVoteFace} alt="down vote" id="down-vote-face" />
            <button id="downvote" onClick={subtract}>
              down vote
            </button>
          </div>
        </div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${extractedUrl}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default Video;
