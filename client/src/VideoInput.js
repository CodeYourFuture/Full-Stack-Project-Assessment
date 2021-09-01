import React from "react";

const VideoInput = ({ reset, data, setData }) => {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<label htmlFor="title">Title:</label>
			<input
				type="text"
				placeholder="enter name here..."
				id="title"
				required
			></input>
			<label htmlFor="videoUrl">URL:</label>
			<input
				type="text"
				placeholder="enter url here..."
				id="videoUrl"
				required
			></input>
			<button onClick={reset}>Cancel</button>
			<button>Add</button>
		</form>
	);
};

export default VideoInput;
