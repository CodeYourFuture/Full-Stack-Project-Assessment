import {useState, useEffect} from "react";
// import Videos from "./exampleresponse.json"
import Card from "./Card";

function Cards() {
	const [videos, setVideos] = useState([]);
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		fetch("http://127.0.0.1:5000")
			.then((res) => res.json())
			.then((data) => setVideos(data))
			.catch((error) => console.log(error));
	}, []);

	const removeElement = (i) => {
		let newVideos = [...videos];
		newVideos.splice(i, 1);
		setVideos(newVideos);
	};
	const updateTitle = (event) => {
		setTitle(event.target.value);
	};

	const updateUrl = (event) => {
		setUrl(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let maxID = Math.max(...videos.map((c) => c.id));
		const newVideo = {
			id: ++maxID,
			title,
			url,
			rating: 0,
			
		};
		setVideos((videos) => {
			return [...videos, newVideo];
		});
		setTitle("");
		setUrl("");
	};

	useEffect(() => {
		console.log(videos);
	}, [videos]);

	return (
		<div>
			<div className='add'>
				<h4>Add a video</h4>

				<form>
					<label>
						Title
						<input type='text' value={title} onChange={updateTitle} />
					</label>
					<label>
						URL
						<input type='text' value={url} onChange={updateUrl} />
					</label>
					<button onClick={handleSubmit} type='submit'>
						This is the button
					</button>
				</form>
			</div>
			<div className='Cards'>
				{videos.map((video, index) => {
					const {id, rating, url, title} = video;
					return <Card key={id} title={title} url={url} rating={rating} index={index} removeElement={removeElement} />;
				})}
			</div>
		</div>
	);
}

export default Cards;

