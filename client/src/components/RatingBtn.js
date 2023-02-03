import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";

const RatingBtn = ({ setYoutube, youtube, movie }) => {
  const increaseRatings = (index) => {
    setYoutube(
      youtube.map((video) => {
        if (video.id === index) {
          return { ...video, rating: video.rating + 1 };
        }
        return video;
      })
    );
  };

  const decreaseRatings = (index) => {
    setYoutube(
      youtube.map((video) => {
        if (video.id === index && video.rating > 0) {
          return { ...video, rating: video.rating - 1 };
        }
        return video;
      })
    );
  };

  return (
    <>
      <button aria-label="Like" onClick={() => increaseRatings(movie.id)}>
        <FontAwesomeIcon icon={faThumbsUp} className="faIcon" />
      </button>

      <button aria-label="Unlike" onClick={() => decreaseRatings(movie.id)}>
        <FontAwesomeIcon icon={faThumbsDown} className="faIcon" />
      </button>
    </>
  );
};

export default RatingBtn;
