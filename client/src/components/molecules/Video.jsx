import React from "react";
import Button from "../atoms/Button";
import Rating from "../atoms/RatingFields";
import axios from "axios";

function Video({ video, loadVideos }) {
  function handleRemoveItem(clickedId) {
    axios
      .delete(`/api/${clickedId}`)
      .then(() => {
        loadVideos();
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
        <Rating video={video} />
        <Button id={video.id} handleClick={handleRemoveItem} btnName="Delete" />
      </div>
    </li>
  );
}

export default Video;
