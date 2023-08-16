import React, {useState} from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

function Rating({rating}) {
    const [videoList, setVideoList] = useState([]);
   const [sortedVideoList, setSortedVideoList] = useState([]);
  const handleVote = (videoId, voteType) => {
    const updatedVideoList = videoList.map((video) => {
      if (video.id === videoId) {
        if (voteType === "like") {
          return {
            ...video,
            rating: video.rating + 1,
          };
        } else if (voteType === "dislike") {
          return {
            ...video,
            rating: video.rating - 1,
          };
        }
      }
      return video;
    });
    setVideoList(updatedVideoList);
    setSortedVideoList(
      [...updatedVideoList].sort((a, b) => b.rating - a.rating)
    );
  };
  return (
    <div>
      <div className="rating">
        <div className="vote-emojis">
                <div
                  className="vote-button"
                  onClick={() => handleVote(rating.id, "like")}
                >
                  <AiFillLike className="like-icon" />
                </div>
                <div
                  className="vote-button"
                  onClick={() => handleVote(rating.id, "dislike")}
                >
                  <AiFillDislike className="dislike-icon" />
                </div>
          </div>
      </div>
    </div>
  );
}

export default Rating;
