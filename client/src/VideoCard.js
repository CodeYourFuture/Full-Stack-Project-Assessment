import React from "react";
import VideoData from "./exampleresponse.json";

const VideoCard = () => {
  return (
    <div>
      {VideoData.map((videoDetails, index) => {
        const youtubeId = videoDetails.url.split("v=")[1];
        return (
          <div>
            <h1>{videoDetails.title}</h1>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <h5>{videoDetails.rating}</h5>
          </div>
        );
      })}
    </div>
  );
};

export default VideoCard;
