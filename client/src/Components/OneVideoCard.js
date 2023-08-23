import { useState } from "react";
const OneVideoCard = ({ id, title, url, rating, handleDelete }) => {
  const [videoRating, setVideoRating] = useState(rating);

  const increase = () => {
    setVideoRating(videoRating + 1);
  };
  const decrease = () => {
    if (videoRating > 0) {
      setVideoRating(videoRating - 1);
    }
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
