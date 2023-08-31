import React from "react";
import MainCard from "./MainCard";

const Card = ({ videos, onDelete, voteUp, voteDown, onVote }) => {
  return (
    <div>
      {videos.map((video) => (
        <MainCard
          key={video.id}
          video={video}
          voteUp={voteUp}
          voteDown={voteDown}
          onDelete={onDelete}
          onVote={onVote}
        />
      ))}
    </div>
  );
};

export default Card;
