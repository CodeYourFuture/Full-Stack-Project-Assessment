import React from "react";
import DeleteButton from "./DeleteButton";
import VideoLikes from "./VideoLikes";

function VideoCard({ video, videos, setVideos }) {
  const videoId = video.url.slice(32);
  return (
    <div className="border border-4 border-dark rounded m-2 mt-5 p-2 bg-dark bg-gradient w-auto">
      <VideoLikes />
      <div className="embed-responsive embed-responsive-16by9">
        <p className="title-paragraph text-light text-monospace">
          {video.title}
        </p>
        <iframe
          className="embed-responsive-item p-2"
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
