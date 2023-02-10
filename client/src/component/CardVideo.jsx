import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

export default function CardVideo({
  video,
  deleteVideo
}) {

  const [rating, setRating] = useState(video.rating)

  if (!video) {
    return null;
  }

  const increaseRating = () => {
    setRating(rating + 1)
  }

  const decreaseRating = () => {
    setRating(rating - 1)
  }

  return (
    <div className="container-card">
      <div className="container-video">
        <h4 className="video-title">{video.title}</h4>
        <iframe
        className="video-video"
          title={video.title}
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${
            video.url.split("watch?v=")[1]
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="container-rating">
        <FontAwesomeIcon className="icon-star" icon={faStar}></FontAwesomeIcon>
        <span className="text-rating">{rating}</span>
      </div>

      <section className="container-buttons">
        <button className="thumbs-up-button" onClick={increaseRating}>
          <FontAwesomeIcon
            icon={faThumbsUp}
          />
        </button>
        <button className="thumbs-down-button" onClick={decreaseRating}>
          <FontAwesomeIcon
            icon={faThumbsDown}    
          />
        </button>

        <button className="delete-button" onClick={() => {deleteVideo(video.id)}}>
          Delete
        </button>
      </section>
    </div>
  );
}

// export default Video;
