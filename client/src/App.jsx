import { key } from "localforage";
import { useState, useEffect } from "react";
import NewVideoForm from "./NewVideoForm";
import DeleteVideobutton from "./DeleteVideoButton";

const App = () => {
	const [recommendedVids, setRecommendedVids] = useState([]);
	useEffect(() => {
		fetchRecommendedVids();
	}, []);

	// fetching data from api.js file to render in the page
	const fetchRecommendedVids = async () => {
		try {
			const response = await fetch("/api/videos");
			const data = await response.json();

			setRecommendedVids(data);
		} catch (error) {
			console.error(error, "For fetch of vids");
		}
	};

	// This function should update recommendedVids with the new video Posted through fetch in NewVideoForm Comp
	const addNewVideoToRecommended = (newVideo) => {
		setRecommendedVids([...recommendedVids, newVideo]);
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
							width="400"
							height="315"
							src={vidObject.src}
							title={vidObject.title}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						></iframe>

						<DeleteVideobutton
							idToDelete={vidObject.id}
							fetchRecommendedVids={fetchRecommendedVids}
						/>
					</li>
				))}
			</ul>
		);
	};
	return (
		<>
			<h1>Video Recommendations</h1>
			<NewVideoForm addNewVideoToRecommended={addNewVideoToRecommended} />
			<div>{videoDisplayer(recommendedVids)}</div>
		</>
	);
};

export default App;
