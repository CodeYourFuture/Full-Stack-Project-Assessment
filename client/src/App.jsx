import { key } from "localforage";
import { useState, useEffect } from "react";

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
				{arr.map((vidObject, index) => (
					<li key={index}>
						<p>
							<a href={vidObject.src} target="_blank">
								{vidObject.title}
							</a>
						</p>
					</li>
				))}
			</ul>
		);
	};
	return (
		<>
			<h1>Video Recommendations</h1>

			<div>{videoDisplayer(recomVids)}</div>
		</>
	);
};

export default App;
