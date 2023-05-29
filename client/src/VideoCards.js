
import { useState } from "react";

function VideoCards({video, videos, setVideos}) {
  const handleUp = () => {

  }
  const handleDown = () => {

  }
  const handleDelete = () => {

  }

  return (
    <>
      <div className="card">
        <iframe title="myFrame"
          src={`https://www.youtube.com/embed/${video.videoID}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div className="card-body">
          <h5 className="card-title">{video.title}</h5>
          <p className="card-text"> Rating: {video.rating}</p>
        </div>
        <div className="button-group">
        <button type="button" class="btn btn-success" onClick={handleUp}>Up</button>
        <button type="button" class="btn btn-warning" onClick={handleDown}>Down</button>
        <button type="button" class="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
      </div>

    </>
  );
}

export default VideoCards;
