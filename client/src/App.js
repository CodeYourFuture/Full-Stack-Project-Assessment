import "./App.css";
import VideoInput from "./VideoInput";
import Video from "./Video";
import { useState, useEffect } from "react";

function App() {
	let [count, setCount] = useState(0);
	const [dataArr, setDataArr] = useState([]);
	const renderForm = () => {
		console.log(count);
		count === 0 ? setCount(1) : setCount(0);
	};
	console.log("This is before api call", dataArr);
	useEffect(() => {
		fetch("http://localhost:5000")
			.then((response) => {
				if (response.status <= 200) {
					return response.json();
				} else {
					throw new Error(`Error ${response.status} : ${response.statusText}`);
				}
			})
			.then((result) => setDataArr(result))
			.catch((error) => console.log(error));
	}, []);
	console.log("This is after api call", dataArr);
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
					<VideoInput reset={renderForm} />
				)}
				<div id="search">
					<label htmlFor="searchInput">Search:</label>
					<input
						type="text"
						id="searchInput"
						placeholder="type here..."
					></input>
				</div>
			</div>
			{dataArr ? <Video data={dataArr} /> : <span>Loading...</span>}
		</div>
	);
}

export default App;
