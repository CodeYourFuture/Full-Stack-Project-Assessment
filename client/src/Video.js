import React, { useState } from "react";
import LikeBtn from "./LikeBtn";
import Delete from "./Delete";

const Video = (props) => {
  const [votes, setVotes] = useState(0);

  const voteHandler = (e) => {
    e.target.getAttribute("data-value") === "like"
      ? setVotes(votes + 1)
      : setVotes(votes - 1);
  };

  return (
    <li key={props.key} className="list-item">
      <div className="like-title-container">
        <h2>{props.title}</h2>
        <div className="like-button-container">
          <LikeBtn
            class="fas fa-thumbs-down fa-lg"
            vote={"dislike"}
            votehandler={voteHandler}
          />
          <h3>
            {votes === 1 || votes === -1 ? `${votes} vote` : `${votes} votes`}
          </h3>
          <LikeBtn
            class="fas fa-thumbs-up fa-lg"
            vote={"like"}
            votehandler={voteHandler}
          />
        </div>
      </div>
      <div className="iframe-container">
        <iframe
          width="320"
          height="240"
          src={props.url}
          title={props.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <Delete delete={props.delete} id={props.id} />
    </li>
  );
};

export default Video;
