import React from "react";

const VideoInput = () => {
	return (
		<div>
			<label for="title">Title:</label>
			<input type="text" placeholder="enter name here..." id="title"></input>
			<label for="videoUrl">URL:</label>
			<input type="text" placeholder="enter url here..." id="videoUrl"></input>
		</div>
	);
};

export default VideoInput;
