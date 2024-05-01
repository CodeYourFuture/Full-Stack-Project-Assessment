import { React, useState, useEffect } from "react";

function NewVideoForm() {
	const [titleFromInput, setTitleFromInput] = useState("");
	const [srcFromInput, setSrcFromInput] = useState("");

	// Example POST method implementation:
	async function PostNewVideo(url = "", data = {}) {
		// Default options are marked with *
		const response = await fetch(url, {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		console.log(response.json(), "<--------response for posting video");
		return response.json(); // parses JSON response into native JavaScript objects
	}

	//This function gets the url and make it a proper link to be embeded.
	function makeTheLinkToEmbed(url) {
		//This line will return the id of utube link
		const id = url.split("?v")[1];
		//Link for being embded
		return "http://www.youtube.com/embed/" + id;
	}

	const handleSubmit = () => {
		makeTheLinkToEmbed(srcFromInput);
		const objectToPost = { titleFromInput, srcFromInput };
		PostNewVideo("/api/video", objectToPost);
	};

	const handleInputTitle = (e) => {
		setTitleFromInput(e.target.value);
	};
	const handleInputUrl = (e) => {
		setSrcFromInput(e.target.value);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Enter Videos Title:</label>
				<input
					type="text"
					value={titleFromInput}
					onChange={(e) => handleInputTitle(e)}
				></input>
				<label>Enter Video's URL:</label>
				<input
					type="text"
					value={srcFromInput}
					onChange={(e) => handleInputUrl(e)}
				></input>
				<button type="submit">Add it!</button>
			</form>
		</>
	);
}

export default NewVideoForm;
