import React from "react";
import { useState } from "react";
import "./compStyle.css";

export const Video = (props) => {
  const [deleteVideo, setDeleteVideo] = useState(true);
  const [countClicking, setCountClicikng] = useState(0);

  const like = () => {
    setCountClicikng(countClicking + 1);
  };
  const dislike = () => {
    if (countClicking > 0) {
      setCountClicikng(countClicking - 1);
    }
  };

  let listThem = props.url.substring(32, 43);

  const deleteTheVideo = () => {
    setDeleteVideo(false);
  };

  return (
    <div className={deleteVideo ? "d-flex flex-column mt-3" : "d-none"}>
      <iframe
        className="m-2"
        width="355"
        height="200"
        src={`https://www.youtube.com/embed/${listThem}`}
        title={props.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder={0}
      ></iframe>
      <div className="d-flex justify-content-center align-items-center">
        <i
          onClick={like}
          className="fa-sharp fa-regular fa-thumbs-up cursoring"
        ></i>
        <i
          onClick={dislike}
          className="fa-sharp fa-regular fa-thumbs-down ml-3 cursoring"
        ></i>
        <p className="ml-3">{countClicking}</p>
      </div>
      <div className="row d-flex justify-content-center">
        <button
          onClick={deleteTheVideo}
          type="button"
          className="btn btn-primary"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
