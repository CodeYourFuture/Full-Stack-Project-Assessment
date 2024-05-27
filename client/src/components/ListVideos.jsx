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
	const getEmbedUrl = (url) => {
		try {
			const urlObj = new URL(url);
			const videoId = urlObj.searchParams.get("v");
			return `https://www.youtube.com/embed/${videoId}`;
		} catch (error) {
			console.error("Invalid URL:", url);
			return null;
		}
	};
	return (
		<>
			<ul className="list-videos">
				{videos.map((video, index) => (
					<li className="l-videos" key={index}>
						<a href={video.url} className="video-title">
							{video.title}
						</a>
						<iframe
							className="youtube-frame"
							width="450"
							height="315"
							src={getEmbedUrl(video.url)}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>
					</li>
				))}
			</ul>
		</>
	);
}

export default ListVideos;
