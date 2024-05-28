import { React, useState, useEffect } from "react";

function NewVideoForm({ addNewVideoToRecommended }) {
	const [titleFromInput, setTitleFromInput] = useState("");
	const [srcFromInput, setSrcFromInput] = useState("");

	// Example POST method implementation:
	async function PostNewVideo(url = "", postedVideo = {}) {
		try {
			const response = await fetch(url, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify(postedVideo),
			});

			if (response.ok) {
				const data = await response.json();
				addNewVideoToRecommended(data);
				setSrcFromInput("");
				setTitleFromInput("");
			} else {
				// Handle other response statuses
				console.error("Failed to insert new video:", response.statusText);
			}
		} catch (error) {
			console.error("Error posting video:", error);
			throw error; // Rethrow error to handle it further if needed
		}
	}

	function makeTheLinkToEmbed(url) {
		if (url && url !== "") {
			const regExp =
				/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
			const match = url.match(regExp);
			if (match && match[2].length === 11) {
				// Valid URL: return the embed link
				return "https://www.youtube.com/embed/" + match[2] + "?autoplay=0";
			} else {
				// Invalid URL: handle appropriately
				// alert("Invalid YouTube URL");
				return null;
			}
		} else {
			// Empty URL: handle appropriately
			// alert("Please enter a YouTube URL");
			return null;
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const title = titleFromInput;
		const src = makeTheLinkToEmbed(srcFromInput);
		// this object send the video title and its embded format src to the back-end
		const objectToPost = { title, src };
		if (src && title) {
			PostNewVideo("/api/videos", objectToPost);
		} else {
			alert("Title or URL is invalid!");
		}
	};

	const handleInputTitle = (e) => {
		setTitleFromInput(e.target.value);
	};
	const handleInputUrl = (e) => {
		setSrcFromInput(e.target.value);
	};
	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="video-title">Enter Videos Title:</label>
				<input
					id="video-title"
					type="text"
					value={titleFromInput}
					onChange={(e) => handleInputTitle(e)}
				></input>
				<label htmlFor="video-src">Enter Video's URL:</label>
				<input
					id="video-src"
					type="text"
					value={srcFromInput}
					onChange={(e) => handleInputUrl(e)}
				></input>
				<button type="submit" aria-label="add-video-button" role="button">
					Add The Video!
				</button>
			</form>
		</>
	);
}

export default NewVideoForm;
