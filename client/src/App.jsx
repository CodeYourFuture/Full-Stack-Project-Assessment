import NewVideoForm from "./NewVideoForm.jsx";
import VideoList from "./VideoRecommendations";

const App = () => {
	return (
		<>
			<h1>Video Recommendations</h1>
    	<VideoList />
       <NewVideoForm />
		</>
	);
};

export default App;
