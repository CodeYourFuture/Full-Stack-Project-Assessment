import { useState } from "react";

const Card = ({ video, clickEvent }) => {
  // split the URL into an array of 2 elements, the 1st element is the video id
  const videoID = video.url.split("=")[1];

  const [rating, setRating] = useState(video.rating);

  // @param {boolean} - based on the boolean will increase / decrease the rating
  const increaseRating = (boolean) =>
    boolean
      ? setRating((rating) => (rating += 1))
      : setRating((rating) => (rating -= 1));

  return (
    <div id={videoID + "-card"} className="card">
      <a
        href={video.url}
        id={videoID + "-title"}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className="orange-text">{video.title}</h2>
      </a>
      <iframe
        id={videoID + "-player"}
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen
      ></iframe>
      <h2 id={videoID + "-rating"} className="orange-text">
        {rating}
      </h2>
      <span id={videoID + "-buttons-container"} className="button-container">
        <p id={videoID + "-like-button"} onClick={() => increaseRating(true)}>
          👍
        </p>
        <p id={videoID + "-remove-button"} onClick={() => clickEvent(video.id)}>
          ❌
        </p>
        <p
          id={videoID + "-dislike-button"}
          onClick={() => increaseRating(false)}
        >
          👎
        </p>
      </span>
    </div>
  );
};

export default Card;
