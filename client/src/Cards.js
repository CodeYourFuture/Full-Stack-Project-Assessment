import { useState } from "react"
import Videos from "./exampleresponse.json"
import uuid from 'react-uuid';
import Card from "./Card";

function Cards() {
	const [videos, setVideos] = useState(Videos)
	
	const removeElement = (i) => {
		let newVideos = [...videos]
		newVideos.splice(i, 1)
		setVideos(newVideos)
	}
	const handleOnSubmit = (data, e) => {
		e.preventDefault();
		let newVideo = {
			"id": uuid(),
			"title": data.title,
			"url":data.url,
		   //  "rating": 23
		   }
		   console.log(data.title, data.url)
			setVideos((videos) => {
			return[...videos, newVideo]
			})
		}
	// put button inside form handleonSubmit dont need handle clack
	const handleClick = () => {
		console.log('handleclick working')
	}
	return (
		<div>
			<div className="add">
				<h4>Add a video</h4>
				<button className="add" onClick={handleClick} type="submit">This is the button</button>
				<form onSubmit={handleOnSubmit}>
            		<label>
            			Title
            			<input type="text" name="title" />
            		</label>
            		<label>
            			URL
            			<input type="text" name="url" />
            		</label>
            		{/* <input onClick={handleClick} type="submit" value="Submit" /> */}
        		</form>
			</div>
			<div className="Cards">
				{videos.map((video, index) => (
					<Card key={video.id} title={video.title} url={video.url} rating={video.rating} index={index} removeElement={removeElement}/>
				))}		
			</div>			
		</div>
	)
}

export default Cards
