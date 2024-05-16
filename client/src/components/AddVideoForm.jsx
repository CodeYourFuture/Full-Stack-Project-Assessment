import { useState } from "react";

export function AddVideoForm() {
	const [isAddingVideo, setIsAddingVideo] = useState(false);

	const addVideoHandler = async (e) => {
		e.preventDefault();

		const title = e.target.elements.title.value;
		const url = e.target.elements.url.value;

		setIsAddingVideo(true);
		try {
			const response = await fetch("/api/videos", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, url }),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to add video. Please, check the response here: ${response}`
				);
			}

			console.log("Video added successfully!");
			window.location.reload();
		} catch (error) {
			console.error("Error adding video:", error.message);
		}
	};

	return (
		<form onSubmit={addVideoHandler}>
			<input type="text" name="title" placeholder="Title" />
			<input type="text" name="url" placeholder="URL" />
			<button type="submit">
				{isAddingVideo ? "Adding Video..." : "Add Video"}
			</button>
		</form>
	);
}
