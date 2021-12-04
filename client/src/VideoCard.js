import React from "react";
import DeleteButton from "./DeleteButton";
import VideoLikes from "./VideoLikes";

function VideoCard({ video, videos, setVideos }) {
  const videoId = video.url.slice(32);
  console.log(videoId);
  return (
    <div>
      <h2>{videos.title}</h2>
      <VideoLikes />
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <DeleteButton id={video.id} videos={videos} setVideos={setVideos} />
    </div>
  );
}

export default VideoCard;
