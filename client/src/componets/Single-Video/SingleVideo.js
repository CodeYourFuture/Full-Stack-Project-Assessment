import { React, useState } from "react";
import LikeDislikeButton from "../Like-Dislike-Buttons/LikeDislikeButton";
import Button from "react-bootstrap/Button";
import axios from "axios";



function SingleVideo({ id, title, url, ratingData, deleteVideo }) {
  const [rating, SetRating] = useState(ratingData);
  
  const updateVideoRating = async (id, rating) => {
    try {
      const response = await axios.put(`/videos/${id}`, { rating });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
 
  function handleIncrement() {
    SetRating((prev) => prev + 1);
    updateVideoRating(id, rating + 1);
  }

  function handleDecrement() {
    if (rating !== 0) {
      SetRating((prev) => prev - 1);
      updateVideoRating(id, rating - 1);
    }
  }

  return (
    <div
      key={id}
      className="single-vid ml-4 shadow p-3 mb-5 bg-white rounded rounded"
    >
      <p> {title}</p>

      <iframe
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
