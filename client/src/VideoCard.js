import React, {useState} from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import "./videoCard.css";

function VideoCard({ video, handleDelete }) {
  const url = video.url.replace("watch?v=", "embed/");

  return (
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
            <DeleteButton onDelete={()=> handleDelete()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
