import React from "react";
import VideoCardButtons from "./VideoCardButtons";
import Embeded from "./Embeded";
import OrderButton from "./OrderButton";

const VideoCard = ({ videos, removeVideo, setVideos }) => {
  return (
    <>
      <OrderButton videos={videos} setVideos={setVideos} />
      <div className="card-container">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <h4>
              {video.video_title.length > 33
                ? `${video.video_title.slice(0, 33)}...`
                : video.video_title}
            </h4>
            <Embeded url={video.video_url} />
            <VideoCardButtons
              rating={video.video_rating}
              id={video.id}
              removeVideo={removeVideo}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoCard;
