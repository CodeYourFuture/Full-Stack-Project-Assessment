import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function VideoCard({ title, url, rating, onRemove }) {
  const videoId = url.split("v=")[1];
  const [votes, setVotes] = useState(rating);

  const handleUpVote = () => {
    setVotes(votes + 1);
  };

  const handleDownVote = () => {
    setVotes(votes - 1);
  };

  return (
    <div className="video-card">
      <div className="video-content">
        <h3 className="video-title">{title}</h3>
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-rating">
          <p>Rating: {votes}</p>
          <div className="vote-buttons">
            <button onClick={handleUpVote}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button onClick={handleDownVote}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm remove-button"
          onClick={() => onRemove(title)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function VideoCards({ videos, onRemove, search }) {
  const [sortOrder, setSortOrder] = useState("desc");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sorting order
  };
  const filteredVideos = videos
    .filter((video) => video.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.rating - b.rating; // Ascending order
      } else {
        return b.rating - a.rating; // Descending order
      }
    });
  return (
    <>
      <button onClick={toggleSortOrder} className="btn btn-secondar">
        Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            url={video.url}
            rating={video.rating}
            onRemove={onRemove}
          />
        ))}
      </div>
    </>
  );
}

export default VideoCards;
