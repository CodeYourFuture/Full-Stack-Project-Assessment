import "./VideoRecommendations.css";
import React, { useState, useEffect } from "react";

const VideoList = () => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		fetch("/api/videos", {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(JSON.stringify(data));
				setVideos(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className="video-list">
			{videos.map((videoData, i) => (
				<div className="video" data-testid="video" key={i}>
					<div>
						<iframe
							title={videoData.title}
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${videoData.src}`}
							frameBorder="0"
							allowFullScreen
						></iframe>
					</div>
				</div>
			))}
		</div>
	);
};

export default VideoList;
