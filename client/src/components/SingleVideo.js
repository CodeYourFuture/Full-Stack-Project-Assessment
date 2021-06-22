import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./SingleVideo.css";

const SingleVideo = ({ video, handleDeleteVideoClick }) => {
  const { title, url, rating, id } = video;
  const [votes, setVotes] = useState(0);

  const handleUpVote = () => {
    setVotes(1);
  };

  const handleDownVote = () => {
    setVotes(-1);
  };

  return (
    <div className="video-card">
      <h3>{title}</h3>
      <div className="votes-container">
        <div>
          <FaThumbsUp
            onClick={handleUpVote}
            className={votes === 1 ? "voted thumb-icon" : "thumb-icon"}
            size={30}
          />
        </div>
        <div>
          <p>{rating + votes} votes</p>
        </div>
        <div>
          <FaThumbsDown
            onClick={handleDownVote}
            className={votes === -1 ? "voted thumb-icon" : "thumb-icon"}
            size={30}
          />
        </div>
      </div>
      <div className="iframe-container">
        <iframe
          className="responsive-iframe"
          width="360"
          height="300"
          src={`https://www.youtube.com/embed/${url.split("=")[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button
        onClick={() => handleDeleteVideoClick(id)}
        className="delete-video-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default SingleVideo;
