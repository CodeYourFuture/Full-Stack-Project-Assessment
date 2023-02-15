import React from "react";
import Button from "react-bootstrap/Button";
import VideoVotes from "./VideoVotes";

const VideoCard = () => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/{VIDEO_ID_GOES_HERE}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div>
        <h2>title</h2>
        <VideoVotes />
        <Button variant="primary">Delete</Button>
      </div>
    </div>
  );
};

export default VideoCard;
