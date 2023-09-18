import React from "react";
import MainCard from "./MainCard";

const Card = ({ videos, onDelete, onVote }) => {
  return (
    <div>
      {videos.map((video) => (
        <MainCard
          key={video.id}
          video={video}
          onDelete={onDelete}
          onVote={onVote}
        />
      ))}
    </div>
  );
};

export default Card;
