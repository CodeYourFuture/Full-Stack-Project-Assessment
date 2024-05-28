import React from "react";

const DeleteVideo = ({ videoId, fetchVideos }) => {
	const deletingVideo = async (videoId) => {
		try {
			const response = await fetch("/api/videos", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: videoId }),
			});
			if (response.ok) {
				console.log("Video deleted successfully");
				fetchVideos();
			} else {
				console.error("Failed to delete video");
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleDelete = () => {
		console.log(videoId);
		deletingVideo(videoId);
	};

	return (
		<div className="delete-video">
			<button onClick={handleDelete}>Remove Video</button>
		</div>
	);
};

export default DeleteVideo;
