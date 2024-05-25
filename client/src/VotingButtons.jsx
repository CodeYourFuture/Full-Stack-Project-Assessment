import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons"; // Import the specific icons

const VotingButtons = ({ videoId, updateVideoVotes, votes }) => {
	const handleVoteUp = () => {
		updateVideoVotes(videoId, 1);
	};

	const handleVoteDown = () => {
		updateVideoVotes(videoId, -1);
	};

	return (
		<>
			<div id="like-holder">
				<FontAwesomeIcon icon={faHeart} id="heart-icon" />
				<span id="likes">{votes}</span>
			</div>
			<div className="vote-button-container">
				<FontAwesomeIcon
					icon={faThumbsDown}
					onClick={handleVoteDown}
					className="vote-button"
				/>
				<FontAwesomeIcon
					icon={faThumbsUp}
					onClick={handleVoteUp}
					className="vote-button"
				/>
			</div>
		</>
	);
};

export default VotingButtons;
