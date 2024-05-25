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

	function changeYTLinkToEmbed(watchLink) {
		const embedLink = watchLink.replace("watch?v=", "embed/");
		return embedLink;
	}

	return (
		<div className="video-list">
			{videos.map((videoData, i) => {
				const embededLink = changeYTLinkToEmbed(videoData.src);
				return (
					<div className="video" data-testid="video" key={i}>
						<div>
							<iframe
								title={videoData.title}
								width="560"
								height="315"
								src={embededLink}
								frameBorder="0"
								allowFullScreen
							></iframe>
						</div>
					</div>
				);
			})}
		</div>
	);
	() => {
		return askxjsnj;
	};
};

export default VideoList;
