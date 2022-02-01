import React, { useState } from "react";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { BsFillHandThumbsDownFill } from "react-icons/bs";
import "./App.css";

const Video = (props) => {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const clickLike = () => {
    setLike((like) => like + 1);
  };
  const clickDisLike = () => {
    setDisLike((disLike) => disLike + 1);
  };
  const [clicked, setClicked] = useState(false);
  const deleteHandler = () => {
    setClicked(true);
  };
  return (
    <div className={clicked ? "non-visible" : "visible"}>
      <div className="vote">
        <BsFillHandThumbsUpFill onClick={clickLike} className="thumb" />
        <span>{like}</span>
        <h5>Vote</h5>

        <BsFillHandThumbsDownFill onClick={clickDisLike} className="thumb" />
        <span>{disLike}</span>
      </div>
      <p>{props.Title}</p>
      <iframe
        width="300"
        height="300"
        src={props.URL}
        title={props.Title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <button
        onClick={deleteHandler}
        type="button"
        className="btn btn-primary mt-3"
      >
        Delete
      </button>
    </div>
  );
};
export default Video;
