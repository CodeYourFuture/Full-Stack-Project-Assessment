import React from "react";
import Rating from "./Rating";
import DeleteBtn from "./DeleteBtn";
const VCard = ({ videoData, onDelete, onUpdateRating }) => {
  const handleDelete = (videoId) => {
    onDelete(videoId);
  };
  const handleRatingUpdate = (videoId, newRating) => {
    onUpdateRating(videoId, newRating);
  };
  return (
    <div className="video-container">
      {videoData.map((video) => (
        <div key={video.id} className="video-card">
          <p>{video.title}</p>
          <iframe
            src={video.url.replace("watch?v=", "embed/")}
            title={video.title}
          ></iframe>
          <Rating
            rating={video.rating}
            onUpdateRating={(newRating) =>
              handleRatingUpdate(video.id, newRating)
            }
          />
          <DeleteBtn videoId={video.id} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default VCard;
