import React, { useState } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const VideoVotes = ({ video }) => {
  const [videoLike, setVideoLike] = useState(video.like);
  const [videoDislike, setVideoDislike] = useState(video.dislike);
  return (
    <div className="vote-wrapper">
      <div className="like-videos-wrapper">
        <ThumbUpAltIcon
          fontSize="large"
          onClick={() => setVideoLike(videoLike + 1)}
        />
        <p>{videoLike}</p>
      </div>
      <h1>Hello from video votes</h1>
      <div className="dislike-videos-wrapper">
        <ThumbDownIcon
          fontSize="large"
          onClick={() => setVideoDislike(videoDislike + 1)}
        />
        <p>{videoDislike}</p>
      </div>
    </div>
  );
};

export default VideoVotes;
