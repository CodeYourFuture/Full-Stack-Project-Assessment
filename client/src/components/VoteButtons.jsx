import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "../styles/VoteButtons.css";
const VoteButtons = ({ onUpVote, onDownVote }) => {
  return (
    <div className="vote-buttons">
      <div className="vote-button like" onClick={onUpVote}>
        <FaThumbsUp />
      </div>
      <div className="vote-button dislike" onClick={onDownVote}>
        <FaThumbsDown />
      </div>
    </div>
  );
};

export default VoteButtons;
