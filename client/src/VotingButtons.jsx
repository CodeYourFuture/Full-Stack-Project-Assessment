import React from "react";

const VotingButtons = ({ videoId, updateVideoVotes, votes }) => {
	const handleVoteUp = () => {
		updateVideoVotes(videoId, 1);
	};

	const handleVoteDown = () => {
		updateVideoVotes(videoId, -1);
	};

	return (
		<>
			<button onClick={handleVoteUp}>Vote Up</button>
			<button onClick={handleVoteDown}>Vote Down</button>
			<p>Votes: {votes}</p>
		</>
	);
};

export default VotingButtons;
