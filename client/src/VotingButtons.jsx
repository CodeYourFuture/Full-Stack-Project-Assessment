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
				<FontAwesomeIcon
					icon={faHeart}
					id="heart-icon"
					aria-label="heart-icon"
				/>
				<span id="likes">{votes}</span>
			</div>
			<div className="vote-button-container">
				<FontAwesomeIcon
					icon={faThumbsDown}
					onClick={handleVoteDown}
					className="button-icon"
					role="button"
					aria-label="dislike-video"
				/>
				<FontAwesomeIcon
					icon={faThumbsUp}
					onClick={handleVoteUp}
					className="button-icon"
					role="button"
					aria-label="like-video"
				/>
			</div>
		</>
	);
};

export default VotingButtons;
