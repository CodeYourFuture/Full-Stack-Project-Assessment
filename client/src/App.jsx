import { Video } from "./components/Video.jsx";
import { useState, useEffect } from "react";

const App = () => {
	const [videos, setVideos] = useState([]);
	useEffect(() => {
		fetch("/api/videos")
			.then((result) => {
				return result.json();
			})
			.then(({ videos }) => {
				setVideos(videos);
			})
			.catch((err) => {
				err;
			});
	}, []);

	return (
		<>
			<h1>Video Recommendations</h1>
			{videos.map((video) => (
				<Video {...video} />
			))}
		</>
	);
};

export default App;
