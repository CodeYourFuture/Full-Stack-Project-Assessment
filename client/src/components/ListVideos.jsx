import React, { useEffect, useState } from "react";

function ListVideos() {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchVideos = async () => {
			try {
				const response = await fetch("/api/videos");
				const data = await response.json();
				setVideos(data.data);
			} catch (error) {
				console.error("Error fetching videos:", error);
			}
		};

		fetchVideos();
	}, []);

	return (
		<>
			<ul>
				{videos.map((video, index) => (
					<li key={index}>
						<a href={video.src}>{video.title}</a>
					</li>
				))}
			</ul>
		</>
	);
}

export default ListVideos;
