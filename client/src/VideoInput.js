import React, { useState } from "react";

const VideoInput = ({ reset, data, setData }) => {
	const [newVideo, setNewVideo] = useState({ rating: 0 });
	const createNewVid = (key, value) => {
		setNewVideo({ ...newVideo, [key]: value });
	};
	console.log(data);
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<label htmlFor="title">Title:</label>
			<input
				type="text"
				placeholder="enter name here..."
				id="title"
				required
				onChange={(e) => createNewVid("title", e.target.value)}
			></input>
			<label htmlFor="videoUrl">URL:</label>
			<input
				type="text"
				placeholder="enter url here..."
				id="videoUrl"
				required
				onChange={(e) => createNewVid("url", e.target.value)}
			></input>
			<button onClick={reset}>Cancel</button>
			<button onClick={() => setData([...data, newVideo])}>Add</button>
		</form>
	);
};

export default VideoInput;
