
import { useState } from "react";

function VideoCards({video, videos, setVideos}) {

  return (
    <>
      <div className="card">
        <iframe title="myFrame"
          src={`https://www.youtube.com/embed/${video.videoID}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div className="card-body">
          <h5 className="card-title">Title: {video.title}</h5>
          <p className="card-text"> Rating: {video.rating}</p>
        </div>
      </div>
    </>
  );
}

export default VideoCards;
