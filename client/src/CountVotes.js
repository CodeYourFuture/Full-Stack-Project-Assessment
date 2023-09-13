import { useState } from "react";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";

const CountVotes = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activeButton, setActiveButton] = useState("none");

  const handleLikeClick = () => {
    if (activeButton === "none") {
      setLikeCount(likeCount + 1);
      setActiveButton("like");
      return;
    }

    if (activeButton === "like") {
      setLikeCount(likeCount - 1);
      setActiveButton("none");
      return;
    }

    if (activeButton === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setActiveButton("like");
    }
  };
  const handleDislikeClick = () => {
    if (activeButton === "none") {
      setDislikeCount(dislikeCount + 1);
      setActiveButton("dislike");
      return;
    }
    if (activeButton === "dislike") {
      setDislikeCount(dislikeCount - 1);
      setActiveButton("none");
      return;
    }
    if (activeButton === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveButton("dislike");
    }
  };
  return (
    <div className="main-container">
      <div className="button-container">
        <button
          className={`button ${activeButton === "like" ? "like-active" : ""}`}
          onClick={handleLikeClick}
        >
          <ThumbUp />
          Like {likeCount}
        </button>

        <button
          className={`button ${
            activeButton === "dislike" ? "dislike-active" : ""
          }`}
          onClick={handleDislikeClick}
        >
          <ThumbDown />
          Dislike {dislikeCount}
        </button>
      </div>
    </div>
  );
};

export default CountVotes;
