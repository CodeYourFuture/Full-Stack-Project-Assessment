import React, { useState } from "react";
import { ThumbUp, ThumbDown, DeleteForever } from "@material-ui/icons";

function VideoCard({ data, handleDelete }) {
  const [rating, setRating] = useState(data.rating);

  function handleThumbDown() {
    setRating(rating - 1);
  }

  function handleThumbUp() {
    setRating(rating + 1);
  }

  return (
    <div
      key={data.id}
      className="card col-12 col-md-3 m-3"
      style={{ width: "18rem" }}
    >
      <iframe
        className="card-img-top"
        src={`https://www.youtube.com/embed/${data.url.split("watch?v=")[1]}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />

      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <div className="d-flex justify-content-between">
          <div onClick={handleThumbUp}>
            <ThumbUp />
          </div>
          <p className="card-text">Rating: {rating}</p>
          <div onClick={handleThumbDown}>
            <ThumbDown />
          </div>
        </div>
        <div onClick={() => handleDelete(data.id)}>
          <DeleteForever fontSize="large" color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
