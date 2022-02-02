import { useState } from "react";

const Card = ({ video }) => {
  // split the URL into an array of 2 elements, the 1st element is the video id
  const videoID = video.url.split("=")[1];

  const [rating, setRating] = useState(video.rating);

  // @param {boolean} - based on the boolean will increase / decrease the rating
  const increaseRating = (boolean) =>
    boolean
      ? setRating((rating) => (rating += 1))
      : setRating((rating) => (rating -= 1));

  const removeVideo = async (event) => {
    const clickedElement = document.getElementById(event.target.id).id;
    const id = clickedElement.split("-")[0];

    console.log(id);

    const result = await fetch(`http://127.0.0.1:5000/${id}`, {
      method: "DELETE",
    });

    result
      .json()
      .then((res) => {
        return res;
      })
      .catch((error) => console.log(error));

    window.location.reload(true); // reload the window to refresh the video listing (need to look into state more)
  };

  return (
    <div id={video.id} className="card white-border">
      <a
        href={video.url}
        id={video.id + "-title"}
        target="_blank"
        rel="noreferrer"
      >
        <h2 className="orange-text">{video.title}</h2>
      </a>
      <iframe
        id={video.id + "-player"}
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <h3 id={video.id + "-rating"} className="orange-text">
        {rating}
      </h3>
      <span id={video.id + "-buttons-container"} className="button-container">
        <p id={video.id + "-like-button"} onClick={() => increaseRating(true)}>
          👍
        </p>
        <p id={video.id + "-remove-button"} onClick={removeVideo}>
          ❌
        </p>
        <p
          id={video.id + "-dislike-button"}
          onClick={() => increaseRating(false)}
        >
          👎
        </p>
      </span>
      <p className="orange-text">
        Upload date: {video.dateAdded ? video.dateAdded : "Unknown"}
      </p>
    </div>
  );
};

export default Card;
