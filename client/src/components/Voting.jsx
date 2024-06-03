import React, { useState } from "react";

const Voting = ({ videoId, initialVote = 0 }) => {
	const [countVote, setCountVote] = useState(initialVote);

	const handleVote = async (voteChange) => {
		const newVote = countVote + voteChange;
		setCountVote(newVote);

		try {
			const response = await fetch("/api/vote", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ videoId, voteChange }),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
		} catch (error) {
			console.error("Error updating vote:", error);
		}
	};

	const handleUpClick = () => {
		handleVote(1);
	};

	const handleDownClick = () => {
		if (countVote > 0) {
			handleVote(-1);
		}
	};

	return (
		<div className="voting">
			<button onClick={handleDownClick}>⬇️</button>
			<h1>
				<span>{countVote}</span>❤️
			</h1>

			<button onClick={handleUpClick}>⬆️</button>
		</div>
	);
};

export default Voting;
