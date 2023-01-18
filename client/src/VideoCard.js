import React from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import "./videoCard.css";

function VideoCard({ video }) {
  const url = video.url.replace("watch?v=", "embed/");
  return (
    // <div className="video-container">
    //   <p>{video.title}</p>
    //   <div className="vote-container">
    //     <LikeIcon />
    //     <p>0 Vote</p>
    //     <DislikeIcon />
    //   </div>
    //   <YouTubeEmbed video={video} />
    //   <DeleteButton />
    // </div>
    <div className="card">
      <iframe
        src={url}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="card-body">
        <h5 className="card-title">{video.title}</h5>
        {/* <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p> */}
        <div className="d-flex justify-content-between flex-row w-100">
          <div className="d-flex justify-content-start align-items-center">
            <LikeIcon />
            &nbsp;
            <div>{video.rating}</div>
            &nbsp;
            <DislikeIcon />
          </div>
          <div className="d-flex justify-content-end">
            <DeleteButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
