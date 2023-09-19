import { useState } from "react";
const OneVideoCard = ({ id, title, url, rating, handleDelete }) => {
  const [videoRating, setVideoRating] = useState(rating);

  const increase = async () => {
    setVideoRating(videoRating + 1);
    fetch(`https://video-recomendations-server.onrender.com/videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: videoRating + 1 }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  const decrease = () => {
    if (videoRating > 1) {
      setVideoRating(videoRating - 1);
    } else {
      setVideoRating(0);
    }
    fetch(`https://video-recomendations-server.onrender.com/videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: videoRating - 1 }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div key={id} className="card col col-md-6 col-lg-4 border-0  ">
      <iframe
        src={"https://www.youtube.com/embed/" + url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="d-flex align-items-center justify-content-between h1 mb-3 d">
          <i
            onClick={increase}
            className="bi bi-hand-thumbs-up-fill text-danger"
          ></i>
          <p className="mt-2">{videoRating} votes</p>
          <i
            onClick={decrease}
            className="bi bi-hand-thumbs-down-fill text-danger"
          ></i>
        </div>
        <button onClick={() => handleDelete(id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};
export default OneVideoCard;
