import { key } from "localforage";
import { useState, useEffect } from "react";
import NewVideoForm from "./NewVideoForm";
import DeleteVideobutton from "./DeleteVideoButton";
import "./style.css";
import VotingButtons from "./VotingButtons";
import SortVideos from "./SortVideos";

const App = () => {
	const [recommendedVids, setRecommendedVids] = useState([]);
	const [url, setUrl] = useState("/api/videos");

	//setting this state to counts likes
	const [likeCounter, setlikeCounter] = useState(0);

	useEffect(() => {
		fetchRecommendedVids(url);
	}, [url]);

	// fetching data from api.js file to render in the page
	const fetchRecommendedVids = async (fetchUrl) => {
		try {
			const response = await fetch(fetchUrl);
			const data = await response.json();

			setRecommendedVids(data);
			console.log(recommendedVids, url, "this is recommeneded vids");
		} catch (error) {
			console.error(error, "For fetch of vids");
		}
	};

	// This function should update recommendedVids with the new video Posted through fetch in NewVideoForm Comp
	const addNewVideoToRecommended = (newVideo) => {
		setRecommendedVids([...recommendedVids, newVideo]);
	};

	const updateVideoVotes = async (videoId, vote) => {
		try {
			const response = await fetch(`/api/videos/${videoId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ vote }),
			});

			if (response.ok) {
				const updatedVideo = await response.json();
				console.log(updatedVideo, "data back from server");

				setRecommendedVids((prevVids) =>
					prevVids.map((vid) =>
						vid.id === videoId ? { ...vid, votes: updatedVideo.votes } : vid
					)
				);
			} else {
				console.error("Failed to update votes");
			}
		} catch (error) {
			console.error("Error updating votes:", error);
		}
	};

	const handleSortChange = (order) => {
		if (order === "asc") {
			setUrl("/api/videos?order=asc");
		} else if (order === "desc") {
			setUrl("/api/videos?order=desc");
		} else {
			setUrl("/api/videos");
		}
	};

	const videoDisplayer = (arr) => {
		return (
			<ul id="videos">
				{arr.map((vidObject) => (
					<li key={vidObject.id} className="video">
						<h2>
							<a href={vidObject.src} target="_blank">
								{vidObject.title}
							</a>
						</h2>

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
						<div id="button-container">
							<div>
								<VotingButtons
									videoId={vidObject.id}
									updateVideoVotes={updateVideoVotes}
									votes={vidObject.votes}
								/>
							</div>
							<div>
								<DeleteVideobutton
									idToDelete={vidObject.id}
									fetchRecommendedVids={() => fetchRecommendedVids(url)}
								/>
							</div>
						</div>
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<h1>Video Recommendations</h1>
			<div id="form-and-sort-container">
				<SortVideos onSortChange={handleSortChange} />
				<NewVideoForm addNewVideoToRecommended={addNewVideoToRecommended} />
			</div>
			<div>{videoDisplayer(recommendedVids)}</div>
		</>
	);
};

export default App;
