import React, { useState } from "react";

import "./NewVideoForm.css";
const NewVideoForm = () => {
	const [title, setTitle] = useState("");
	const [src, setSrc] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("/api/videos", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, src }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(JSON.stringify(data));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div>
			<h2>Add New Video</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Video Title: </label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="src">Video URL: </label>
					<input
						type="url"
						id="src"
						value={src}
						onChange={(e) => setSrc(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default NewVideoForm;
