import React, { useState } from "react";
// import staticData from "./exampleresponse.json";
// import Ratings from "./Ratings";

const Video = ({ Rating, SetRating, data }) => {
	const [videoData, setVideoData] = useState(data);
	const ratings = [];
	for (let item of videoData) {
		ratings.push([item.id, item.rating]);
	}
	console.log(ratings);
	const ratingUpdater = (VideoId) => {
		const filteredData = (item) => item.id === VideoId;
		SetRating(filteredData.rating);
	};
	return (
		<div>
			{videoData.map((video, index) => {
				const videoCode = video.url.slice(
					video.url.indexOf("=") + 1,
					video.url.length
				);

				return (
					<div key={index}>
						<h3>{video.title}</h3>
						<iframe
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${videoCode}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
						<div id="buttonContainer">
							<button onClick={() => ratingUpdater(video.id)}>Like</button>
							<h4>{`Rating: ${Rating ? Rating : video.rating}`}</h4>
							{/* <Ratings data={dataArr} setData={setDataArr} />; */}
							{/* <Ratings data={dataArr} setData={setDataArr} VideoId={video.id} /> */}
							<button onClick={() => ratingUpdater(video.id)}>Dislike</button>
						</div>
						<button
							onClick={() =>
								setVideoData(videoData.filter((item) => item.id !== video.id))
							}
						>
							Delete
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default Video;
