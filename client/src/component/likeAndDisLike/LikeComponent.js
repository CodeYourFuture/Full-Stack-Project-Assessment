import React, { useState } from "react";
import '../likeAndDisLike/like.css';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const LikeComponent = () => {
  const [likeCount, setLikeCount] = useState(11);
  const [dislikeCount, setDislikeCount] = useState(9);

  const [isActive, setIsActive] = useState("none");

  const handleLike = () => {
    if (isActive === "none") {
      setLikeCount(likeCount + 1);
      setIsActive("like");
    }

    if (isActive === "like") {
      setLikeCount(likeCount - 1);
      setIsActive("none");
    }

    if (isActive === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setIsActive("like");
    }
  };

  const handleDislike = () => {
    if (isActive === "none") {
      setDislikeCount(dislikeCount + 1);
      setIsActive("dislike");
    }

    if (isActive === "dislike") {
      setDislikeCount(dislikeCount - 1);
      setIsActive("none");
    }

    if (isActive === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setIsActive("dislike");
    }
  };

  return (
    <div className="like-container">
      <div className="btn-container">
        <button
          className={`btn ${isActive === "like" ? "like-active" : ""}`}
          onClick={handleLike}
        >
          <ThumbUpIcon />
          / {likeCount}
        </button>

        <button
          className={`btn ${isActive === "dislike" ? "dislike-active" : ""}`}
          onClick={handleDislike}
        >
            <ThumbDownIcon />
          / {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default LikeComponent;
