import { AddVideoForm } from "./components/AddVideoForm";
import ListVideos from "./components/ListVideos";

const App = () => {
	return (
		<>
			<h1>Video Recommendations</h1>

			<AddVideoForm />
			<ListVideos />
		</>
	);
};

export default App;
