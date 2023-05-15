import React, { useState } from "react";
import DeleteVideo from "./DeleteVideo.js";
import VoteScore from "./VoteScore.js";

const Video = ({ video, handleDelete, updateRating }) => {
  const [rating, setRating] = useState(video.rating);

   const increaseRating = () => {
     const newRating = video.rating + 1;
     updateRating(video.id, newRating);
   };

   const decreaseRating = () => {
     const newRating = video.rating - 1;
     updateRating(video.id, newRating);
   };

  return (
    <div className="video-container">
      <h2>{video.title}</h2>
      <iframe src={video.url} title={video.title} allowFullScreen>
        {" "}
        allowFullScreen
      </iframe>
      <p>Number of Votes: {video.rating} </p>
      <DeleteVideo video={video} handleDelete={handleDelete} />
      <VoteScore
        rating={rating}
        increaseRating={increaseRating}
        decreaseRating={decreaseRating}
      />
    </div>
  );
};

export default Video;
