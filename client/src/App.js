import "./App.css";
import VideoInput from "./VideoInput";
import { useState } from "react";

function App() {
	let [count, setCount] = useState(0)
	const renderForm = () => {
    console.log(count);
		count === 0 ? setCount(1) : setCount(0);
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
					<VideoInput reset={renderForm}/>
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
