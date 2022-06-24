import React, { useState } from "react";
import axios from "axios";

const VideoPanel = ({ key, video, deleteHandler}) => {
  let codeRequired = video.url.split("=")[1];
  let srcLink = `https://www.youtube.com/embed/${codeRequired}`;
  // let srcLink = video.url.replace("watch?v=", "embed/")
  const [rate, setRate] = useState(video.rating);
  const updateRate = (rateUpDown) => {
    axios
      .put(`https://videoss-db.herokuapp.com/${video.id}/rating`, {
      
        rating: rate + rateUpDown,
      })
      .then((res) => {
        console.log(res);
        setRate(rate + rateUpDown);
      });
  };
  const likeClick = () => {
    // updateRating(video.id, rate + 1);
    updateRate(1);
  };
  const dislikeClick = () => {
    // updateRating(video.id, rate - 1);
    updateRate(-1);
  };

  const uploadedTime = () => {
    let date = new Date();
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    
    return date.toLocaleDateString("en-UK", options);
  };

  

  return (
    <div key={key} className="videoPanel">
      <div>
        <h3>{video.title}</h3>
      </div>
      <div>
        <h5>Video ID: {video.id}</h5>
      </div>
      <div>
        <iframe
          width="560"
          height="315"
          src={srcLink}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        <img
          alt="dislike"
          onClick={dislikeClick}
          src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/undefined/external-dislike-feedback-kmg-design-detailed-outline-kmg-design.png"
        />
        Rate: {rate}
        <img
          alt="like"
          onClick={likeClick}
          src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/undefined/external-like-feedback-kmg-design-detailed-outline-kmg-design.png"
        />
      </div>
      <div>Posted on: {video.date}</div>
      <div>Uploaded at: {uploadedTime()}</div>
      <button className="btn btn-danger w-25 align-self-center"
        onClick={() => {
          deleteHandler(video.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
};

export default VideoPanel;
