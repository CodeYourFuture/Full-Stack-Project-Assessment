import React, { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import YouTubeEmbed from "./YouTubeEmbed";
import "bootstrap/dist/css/bootstrap.css";

function Video({ video }) {
  // states count vote and check for videos voted or not
  const [vote, setVote] = useState(video.vote);
  const [isVoted, setIsVoted] = useState(video.isVoted);

  //handle votes
  const handleVote = (e) => {
    let voteCount;
    voteCount = e ? vote + 1 : vote - 1;
    setVote(voteCount);
    setIsVoted(!isVoted);
  };

  return (
    
      
      <div className="video-container">
        <p>{video.title}</p>
        <div className="vote-container">
          <LikeIcon clickFunc={handleVote} isVoted={isVoted} />
          <p>{vote} Vote</p>
          <DislikeIcon clickFunc={handleVote} isVoted={!isVoted} />
        </div>
        <YouTubeEmbed video={video} />
        <p className="m-2">Posted at {video.postedDate?video.postedDate:""}</p>
        <DeleteButton />
      
    </div>
  );
}

export default Video;
