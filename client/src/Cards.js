import {useState, useEffect} from "react";
import Card from "./Card";

function Cards() {
	const [videos, setVideos] = useState([]);
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		fetchVideos();
	}, []);

	function fetchVideos() {
		fetch("https://cyf-wagmi-backend.onrender.com/videos")
			.then((res) => res.json())
			.then((data) => setVideos(data))
			.catch((error) => console.log(error));
		console.log(videos);
	}

	function deletevideobyID(id, index) {
		fetch(`https://cyf-wagmi-backend.onrender.com/videos/${id}`, {method: "delete"})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				removeElement(index);
			})
			.catch((error) => console.log(error));
	}

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
		let maxID = Math.max(...videos.map((c) => c.id));
		const newVideo = {
			id: ++maxID,
			title,
			url,
			rating: 0,
		};
		// e.preventDefault();
		setTitle("");
		setUrl("");
		fetch(`https://cyf-wagmi-backend.onrender.com/videos`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newVideo),
		})
			.then((res) => res.json())
			.then((data) => setVideos(data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		console.log(videos);
	}, [videos]);

	return (
		<div>
			<div className='add'>
				<form>
					<h4>Add a video</h4>
					<label>
						Title
						<input type='text' className='label' value={title} onChange={updateTitle} />
					</label>
					<label>
						URL
						<input type='text' className='label' value={url} onChange={updateUrl} />
					</label>
					<button onClick={handleSubmit} type='submit' className='formButton'>
						Add to library
					</button>
				</form>
			</div>
			<div className='Cards'>
				{videos.map((video, index) => {
					const {_id, rating, url, title} = video;
					return <Card key={_id} id={_id} title={title} url={url} rating={rating} index={index} removeElement={deletevideobyID} />;
				})}
			</div>
		</div>
	);
}

export default Cards;
