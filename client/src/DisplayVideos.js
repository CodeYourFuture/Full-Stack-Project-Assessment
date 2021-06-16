import React, { useState } from "react";
import { IoHeart, IoHeartDislikeSharp } from "react-icons/io5";

const DisplayVideos = ({ video, handleClickButton,index }) => {
  const videoId = video.url.split("=");
  const [votes, setVotes] = useState(0);
  return (
    <div className="container p-5">
      <div>
        <button
          key={index + 1}
          name="increaseVote"
          aria-label="Like video"
          className="btn btn-danger mx-5"
          onClick={() => setVotes(votes + 1)}
        >
          <IoHeart />
        </button>
        <label>{votes} Votes </label>
        <button
          key={index + 2}
          name="decreaseVote"
          aria-label="Dislike video"
          className="btn btn-danger mx-5"
          onClick={() => setVotes(votes - 1)}
        >
          <IoHeartDislikeSharp />
        </button>
      </div>
      <p className="m-2">{video.title}</p>
      <div>
        <iframe
          key={index}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId[1]}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button
        name="deleteVideo"
        key={index}
        className="btn btn-danger mt-2"
        onClick={() => handleClickButton(video.id)}
      >
        Delete
      </button>
    </div>
  );
};
export default DisplayVideos;
