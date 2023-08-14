import React from "react";
import DeleteVideo from "./DeleteVideo.js";
import VoteScore from "./VoteScore.js";

const Video = ({ video, handleDelete, updateRating }) => {
  const increaseRating = () => {
    const newRating = video.rating + 1;
    updateRating(video.id, newRating);
    sendRatingUpdateRequest(video.id, 1);
  };

  const decreaseRating = () => {
    const newRating = video.rating - 1;
    updateRating(video.id, newRating);
    sendRatingUpdateRequest(video.id, -1);
  };

  const sendRatingUpdateRequest = (videoId, rating) => {
    fetch(`http://localhost:5000/${videoId}/rating`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update rating.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div className="video-container">
      <h1 className="text-heading">{video.title}</h1>
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
