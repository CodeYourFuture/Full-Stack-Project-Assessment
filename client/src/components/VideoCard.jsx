import YouTube from "react-youtube";
import { FaHeart } from "react-icons/fa";
import RemoveButton from "./RemoveButton";
import VoteButtons from "./VoteButtons";

import "../styles/VideoCard.css";

const VideoCard = ({ video, removeVideo, upVote, downVote }) => {
  const extractVideoId = (url) => {
    const videoId = url.split("v=")[1];
    return videoId;
  };

  const opts = {
    width: "280",
    height: "157",
  };

  return (
    <div className="video-card-container">
      <div className="video-card">
        <YouTube videoId={extractVideoId(video.url)} opts={opts} />

        <div className="video-details">
          <h2>{video.title}</h2>
          <div className="heart-icon-container">
            <div className="heart-icon">
              <FaHeart />
            </div>
            <span className="rating-count">{video.rating}</span>
          </div>
          <VoteButtons
            onUpVote={() => upVote(video.id)}
            onDownVote={() => downVote(video.id)}
          />
          <RemoveButton onClick={() => removeVideo(video.id)} />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
