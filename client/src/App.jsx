import { key } from "localforage";
import { useState, useEffect } from "react";
import NewVideoForm from "./NewVideoForm";

const App = () => {
	const [recomVids, setRecomVids] = useState([]);
	useEffect(() => {
		fetchRecommendedVids();
	}, []);

	// fetching data from api.js file to render in the page
	const fetchRecommendedVids = async () => {
		try {
			const response = await fetch("/api/videos");
			const data = await response.json();
			console.log(data, "<---------data");
			setRecomVids(data);
		} catch (error) {
			console.error(error, "For fetch of vids");
		}
	};

	const videoDisplayer = (arr) => {
		return (
			<ul>
				{arr.map((vidObject) => (
					<li key={vidObject.id}>
						<p>
							<a href={vidObject.src} target="_blank">
								{vidObject.title}
							</a>
						</p>
						<iframe
							width="560"
							height="315"
							src={vidObject.src}
							frameborder="0"
							allowFullScreen
						></iframe>
					</li>
				))}
			</ul>
		);
	};
	return (
		<>
			<h1>Video Recommendations</h1>
			<NewVideoForm />
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/DB8vro4PDao?si=kLFTI_UrMOrYQdQL"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
			<div>{videoDisplayer(recomVids)}</div>
		</>
	);
};

export default App;
