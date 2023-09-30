import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./SingleVideo.css";

const SingleVideo = ({ video, handleDeleteVideoClick }) => {
  const { title, url, rating, id } = video;
  const [votes, setVotes] = useState(0); // can be 0, 1 or -1 => to add to rating when thumbsUp or ThumbsDown is clicked
  const iconSize = 30;

  const handleUpVote = () => {
    setVotes((prev)=>prev+=1);
  };

  const handleDownVote = () => {
    setVotes((prev)=>prev-=1);
  
  };
console.log(rating,votes)
  return (
    <div className="video-card">
      <h3>{title}</h3>
      <div className="iframe-container">
        <iframe
          className="responsive-iframe"
          width="560"
          height="310"
          src={`https://www.youtube.com/embed/${url.split("v=")[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="votes-container">
        <div>
          <FaThumbsUp
            onClick={handleUpVote}
            className={votes === 1 ? "voted thumb-icon" : "thumb-icon"}
            size={iconSize}
          />
        </div>
        <div>
          <p>{rating + votes} votes</p>
        </div>
        <div>
          <FaThumbsDown
            onClick={handleDownVote}
            className={votes === -1 ? "voted thumb-icon" : "thumb-icon"}
            size={iconSize}
          />
        </div>
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