import React from "react";

const VideoInput = (props) => {
	return (
		<div>
			<label for="title">Title:</label>
			<input type="text" placeholder="enter name here..." id="title"></input>
			<label for="videoUrl">URL:</label>
			<input type="text" placeholder="enter url here..." id="videoUrl"></input>
            <button onClick={props.reset}>Cancel</button>
            <button>Add</button>
		</div>
	);
};

export default VideoInput;
