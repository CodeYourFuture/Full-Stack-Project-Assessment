import React from "react";
import DeleteVideo from "./DeleteVideo.js";
import VoteScore from "./VoteScore.js";

const Video = ({ video, handleDelete, updateRating }) => {
 

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
      <p className="text-heading">{video.title}</p>
      <iframe
        className="video-frame"
        src={video.url}
        title={video.title}
        allowFullScreen
      >
        {" "}
        allowFullScreen
      </iframe>
      <p className="text-heading">Number of Votes: {video.rating} </p>
      <DeleteVideo video={video} handleDelete={handleDelete} />
      <VoteScore
        increaseRating={increaseRating}
        decreaseRating={decreaseRating}
      />
    </div>
  );
};

export default Video;
