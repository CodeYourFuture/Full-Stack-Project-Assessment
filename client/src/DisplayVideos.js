import React, { useState } from "react";
import { IoHeart, IoHeartDislikeSharp } from "react-icons/io5";
import "./App.css";

const DisplayVideos = ({ video, handleClickButton, index }) => {
  const videoId = video.url.split("=");
  const [votes, setVotes] = useState(video.rating);
  
  return (
    <div className="col-lg-4 col-md-6 mx-auto p-2 my-5" key={index}>
      <div className="video-header">
        <p className="m-2">{video.title}</p>
        <div>
          <button
            name="increaseVote"
            aria-label="Like video"
            className="btn btn-danger mx-2"
            onClick={() => setVotes(votes + 1)}
          >
            <IoHeart />
          </button>
          <label>{votes} Votes </label>
          <button
            name="decreaseVote"
            aria-label="Dislike video"
            className="btn btn-danger mx-2 py-1 px-2"
            onClick={() => setVotes(votes - 1)}
          >
            <IoHeartDislikeSharp />
          </button>
        </div>
      </div>
      <div>
        <iframe
          key={index+1}
          width="350px"
          height="250px"
          src={`https://www.youtube.com/embed/${videoId[1]}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button
        name="deleteVideo"
        key={index+2}
        className="btn btn-danger mt-2"
        onClick={() => handleClickButton(video.id)}
      >
        Delete
      </button>
    </div>
  );
};
export default DisplayVideos;
