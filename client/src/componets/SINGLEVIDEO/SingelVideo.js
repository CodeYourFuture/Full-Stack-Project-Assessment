import { React, useState } from "react";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import Button from "react-bootstrap/Button";

function SingleVideo({ id, title, url, ratingData, deleteVideo }) {
  const [rating, SetRating] = useState(ratingData);

  function handleIncrement() {
    SetRating((prev) => prev + 1);
  }

  function handleDecrement() {
    if (rating !== 0) {
      SetRating((prev) => prev - 1);
    }
  }

  return (
    <div key={id} className="single-vid mr-5 shadow p-3 mb-5 bg-white rounded rounded">
      <p> {title}</p>

      <iframe
        // width="500"
        // height="315"
        src={url}
        title={title}
        border="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <LikeDislikeButton
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        rating={rating}
      />
     
      <Button
            onClick={() => deleteVideo(id)}
            className="ml-1 mt-1 mb-1"
            variant="primary"
            type="cancel"
          >
            Delete
          </Button>
    </div>
  );
}

export default SingleVideo;
