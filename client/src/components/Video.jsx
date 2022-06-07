import React from "react";
import "../App.css";
import DeleteButton from "./atoms/DeleteButton";
import Rating from "./atoms/RatingFields";

function Video({ video, loadVideos }) {

  return (
    <li className="col-sm-6">
      <div className="card-body text-center">
        <h4 style={{ height: 55 }} className="card-title">
          {video.title}
        </h4>
        <iframe
          title="YouTube video player"
          width="100%"
          height="300"
          src={video.url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Rating video={video}/>
        <DeleteButton id={video.id} load={loadVideos} />
      </div>
    </li>
  );
}

export default Video;
