import React, { useState } from "react";
import "./Card.css";
import { MdOutlineThumbUp, MdOutlineThumbDownAlt } from "react-icons/md";
import { ImBin2 } from "react-icons/im";

const Card = ({ id, title, url, rating, uploadedAt, onDelete }) => {
  const [voteScore, setVoteScore] = useState(rating);

  const handleUpVote = () => {
    setVoteScore(voteScore + 1);
  };

  const handleDownVote = () => {
    setVoteScore(voteScore - 1);
  };

  const handleDeleteCard = () => {
    onDelete(id);
  };

  return (
    <div className="card">
      <h3>{title}</h3>

      <div className="video-responsive">
        <iframe
          width="250"
          height="250"
          src={url.replace("watch?v=", "embed/")}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
      <p>Rating: {voteScore}</p>
      <p>Uploaded at: {uploadedAt}</p> {/* Display the uploadedAt information */}
      <div className="btn-section">
        <button className="rate-btn up" onClick={handleUpVote}>
          <MdOutlineThumbUp size={24} />
        </button>
        <button className="rate-btn down" onClick={handleDownVote}>
          <MdOutlineThumbDownAlt size={24} />
        </button>
        <button className="delete-btn" onClick={handleDeleteCard}>
          <ImBin2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default Card;
