import { useState } from "react";

const Video = ({ id, title, link, rating, datetime, deleteVideo, baseUrl }) => {
  const [ratings, setRatings] = useState(rating);

  const changeRating = (increase) => {
    const newRating = increase ? ratings + 1 : ratings - 1;
    fetch(baseUrl + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: newRating }),
    })
      .then((response) => {
        if (response.status !== 200) {
          alert("Rating could not be changed");
        }
        return response.json();
      })
      .then((data) => setRatings((ratings) => data.rating));
  };

  return (
    <article>
      <h2>{title}</h2>

      <iframe
        width="100%"
        height="315"
        src={"https://www.youtube.com/embed/" + link.split("?v=").slice(-1)}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p className="rating">
        Rating: {ratings}{" "}
        <button
          type="button"
          className="like btn btn-light"
          aria-label="increase-rating"
          onClick={() => changeRating(true)}
        >
          <i className="fa fa-thumbs-up"></i>
        </button>
        <button
          type="button"
          className="like btn btn-light"
          aria-label="decrease-rating"
          onClick={() => changeRating(false)}
        >
          <i className="fa fa-thumbs-down"></i>
        </button>
      </p>
      {datetime && <p>Added on: {new Date(datetime).toUTCString()}</p>}
      <button
        type="button"
        className="btn btn-danger"
        aria-label="delete-video"
        onClick={() => deleteVideo(id)}
      >
        Delete video
      </button>
    </article>
  );
};

export default Video;
