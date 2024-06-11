import { useEffect, useState } from "react";
import VideoForm from "./VideoForm";

const Videos = () => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await fetch("/api/videos");
				const data = await response.json();
				setVideos(data.videos);
				console.log(data);
			} catch (error) {
				console.error("Error fetching videos:", error);
			}
		};

		fetchVideos();
	}, []);

	const addVideo = (video) => {
		setVideos((prevVideos) => [...prevVideos, video]);
	};

	const deleteVideo = async (id) => {
		try {
			const response = await fetch(`/api/videos/${id}`, {
				method: "DELETE",
			});

			if (response.status === 204) {
				setVideos((prevVideos) =>
					prevVideos.filter((video) => video.id !== id)
				);
			} else if (response.status === 404) {
				console.error("Video not found");
			} else {
				console.error("Failed to delete video");
			}
		} catch (error) {
			console.error("Error deleting video:", error);
		}
	};

	return (
		<div>
			<h2>Video List</h2>
			<VideoForm addVideo={addVideo} />

			<ul>
				{videos.map((video) => (
					<li key={video.id}>
						<a href={video.src} target="_blank" rel="noopener noreferrer">
							{video.title}
						</a>
						<button onClick={() => deleteVideo(video.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Videos;
