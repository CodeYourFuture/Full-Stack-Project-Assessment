import React from "react";
import VideoData from "./exampleresponse.json";
import VotesButtons from "./VotesButtons";

const VideoCard = () => {
  return (
    <div className="video-container">
      {VideoData.map((videoDetails, index) => {
        const youtubeId = videoDetails.url.split("v=")[1];
        return (
          <div>
            <h1>{videoDetails.title}</h1>
            <iframe
              style={{ width: "100%", height: "100%" }}
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <VotesButtons />
          </div>
        );
      })}
    </div>
  );
};

export default VideoCard;
