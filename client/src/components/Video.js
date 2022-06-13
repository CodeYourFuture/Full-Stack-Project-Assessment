import React, { useState } from "react";
import smileyFace from "../smiley-face.png";
import downVoteFace from "../downvote-face.png";
import data from "../data";

function Video(props) {
  const [count, setCount] = useState(props.item.rating);

  function add() {
    setCount((prevCount) => prevCount + 1);
  }

  function subtract() {
    setCount((prevCount) => prevCount - 1);
  }

  const [list, updateList] = useState(data);

  const handleRemoveItem = (e) => {
    const id = e.target.getAttribute("id");
    updateList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="video">
      <hr />
      <h2>{props.item.title}</h2>
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

      <div>
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + props.item.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <button
        id="remove"
        type="button"
        onClick={() => handleRemoveItem(props.item.id)}
      >
        remove
      </button>
    </div>
  );
}

export default Video;
