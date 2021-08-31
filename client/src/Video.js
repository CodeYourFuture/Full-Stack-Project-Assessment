import React from "react";
import Ratings from "./Ratings";

const Video = ({ data, setData }) => {
	return (
		<div>
			{data.map((video, index) => {
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
							<Ratings defaultRating={video.rating} />
						</div>
						<button
							onClick={() =>
								setData(data.filter((item) => item.id !== video.id))
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
