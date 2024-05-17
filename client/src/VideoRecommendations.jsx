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
						{/* <a>{videoData.title}</a> */}
						<a href={videoData.src}>{videoData.title}</a>
					</div>
				</div>
			))}
		</div>
	);
};

export default VideoList;
