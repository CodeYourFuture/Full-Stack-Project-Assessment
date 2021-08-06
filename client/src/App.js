import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>Video Recommendation</h1>
			</header>
			<div className="Container">
				<button id="addVideo">Add Video</button>
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
