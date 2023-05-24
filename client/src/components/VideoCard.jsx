import { useState } from "react";

export default function VideoCard({ video, setRefreshVideos }) {
  const [loading, setLoading] = useState(false);
  const [localRating, setLocalRating] = useState(video.rating);
  const [localFavourite, setLocalFavourite] = useState(video.favourite);

  async function handleVote(event, voteType) {
    setLoading(true);
    try {
      // get the id from the "data-id" attribute
      // need to use currentTarget not target because of the image nested inside the button
      const id = event.currentTarget.dataset.id;
      console.log(`handleVote ${voteType} button clicked with id ${id}`);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/videos/${id}?vote=${voteType}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log("handleVote data:", data);
      const updatedRating = data.payload.rating;
      setLocalRating(updatedRating);
    } catch (error) {
      console.log(`handleVote ${voteType} error:`, error);
    }
    setLoading(false);
  }

  async function handleFavourite(event) {
    setLoading(true);
    try {
      // get the id from the "data-id" attribute
      // need to use currentTarget not target because of the image nested inside the button
      const id = event.currentTarget.dataset.id;
      console.log(`handleFavourite button clicked with id ${id}`);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/videos/${id}/favourite`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log("handleFavourite data:", data);
      const updatedFavourite = data.payload.favourite;
      setLocalFavourite(updatedFavourite);
    } catch (error) {
      console.log(`handleFavourite error:`, error);
    }
    setLoading(false);
  }

  async function handleDelete(event) {
    setLoading(true);
    try {
      // get the id from the "data-id" attribute
      // need to use currentTarget not target because of the image nested inside the button
      const id = event.currentTarget.dataset.id;
      console.log(`handleDelete button clicked with id ${id}`);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/videos/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log("handleDelete data:", data);

      setRefreshVideos((prevRefreshVideos) => !prevRefreshVideos);
    } catch (error) {
      console.log(`handleDelete error:`, error);
    }
    setLoading(false);
  }

  return (
    <div key={video.id} className="video-card">
      <div className="video-card-iframe-container">
        <iframe
          className="video-card-iframe"
          src={`https://www.youtube.com/embed/${video.videoid}`}
          frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <h3 className="video-card-title">{video.title}</h3>
      <div className="video-card-functionality-container">
        <button
          data-id={video.id}
          onClick={handleDelete}
          className="video-card-delete"
          disabled={loading}
        >
          <img
            src="images/delete.png"
            alt="delete"
            className="video-card-delete-image"
          />
        </button>
        <button
          data-id={video.id}
          onClick={(event) => handleVote(event, "down")}
          disabled={loading}
          className="video-card-vote-down-button"
        >
          <img
            src="images/dislike-flipped.png"
            alt="dislike"
            className="video-card-vote-down-image"
          />
        </button>
        <p className="video-card-rating">
          <span
            className={`video-card-rating-${
              localRating > 0
                ? "positive"
                : localRating < 0
                ? "negative"
                : "neutral"
            }`}
          >
            {localRating > 0 ? `+${localRating}` : localRating}
          </span>
        </p>
        <button
          data-id={video.id}
          onClick={(event) => handleVote(event, "up")}
          disabled={loading}
          className="video-card-vote-up-button"
        >
          <img
            src="images/like-flipped.png"
            alt="like"
            className="video-card-vote-up-image"
          />
        </button>
        <button
          data-id={video.id}
          onClick={handleFavourite}
          className="video-card-favourite"
          disabled={loading}
        >
          <img
            src={`images/${
              localFavourite
                ? "favourite-true-heart.png"
                : "favourite-false-heart.png"
            }`}
            alt="like"
            className="video-card-vote-up-image"
          />
        </button>
      </div>
      <div className="video-card-date-id-container">
        <p className="video-card-date">
          Added:{" "}
          {new Date(video.created_at).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </p>
        <p className="video-card-id">id:{video.id}</p>
      </div>
    </div>
  );
}
