import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "../styles/VoteButtons.css";

const VoteButtons = ({ video, onUpVote, onDownVote, votedVideos }) => {
  const handleUpVote = () => {
    onUpVote(video.id);
  };

  const handleDownVote = () => {
    onDownVote(video.id);
  };

  const hasVoted = votedVideos.includes(video.id);

  return (
    <div className="vote-buttons">
      <div
        className={`vote-button like${hasVoted ? " disabled" : ""}`}
        onClick={handleUpVote}
      >
        <FaThumbsUp />
      </div>
      <div
        className={`vote-button dislike${hasVoted ? " disabled" : ""}`}
        onClick={handleDownVote}
      >
        <FaThumbsDown />
      </div>
    </div>
  );
};

export default VoteButtons;
