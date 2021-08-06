import "./App.css";
import VideoInput from "./VideoInput";

function App() {
	let count = 0;
	const renderForm = () => {
    console.log(count);
		count === 0 ? count++ : count--;
	};
	return (
		<div className="App">
			<header className="App-header">
				<h1>Video Recommendation</h1>
			</header>
			<div className="Container">
				{count === 0 ? (
					<button id="addVideo" onClick={renderForm}>
						Add Video
					</button>
				) : (
					<VideoInput />
				)}
				<div id="search">
					<label for="searchInput">Search:</label>
					<input
						type="text"
						id="searchInput"
						placeholder="type here..."
					></input>
				</div>
			</div>
		</div>
	);
}

export default App;
