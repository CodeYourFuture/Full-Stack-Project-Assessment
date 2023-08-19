import React from "react";
import Voting from "./Voting";
import DeleteButton from "./DeleteButton";

const VideoCards = ({ videoData, onDelete, onUpdateRating }) => {
  console.log(videoData);
  const handleDelete = (videoId) => {
    onDelete(videoId);
  };

  const handleRatingUpdate = (videoId, newRating) => {
    onUpdateRating(videoId, newRating);
  };

  return (
    <div className="container">
      {videoData.map((video) => (
        <div key={video.id} className="card">
          <h2>{video.title}</h2>
          <iframe
            src={video.url.replace("watch?v=", "embed/")}
            title={video.title}
          ></iframe>
          <Voting
            rating={video.rating}
            onUpdateRating={(newRating) =>
              handleRatingUpdate(video.id, newRating)
            }
          />
          <DeleteButton videoId={video.id} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};
export default VideoCards;
