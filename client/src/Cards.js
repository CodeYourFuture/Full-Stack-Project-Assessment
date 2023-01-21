import { useState } from "react"
import Videos from "./exampleresponse.json"
import ReactPlayer from "react-player"
import Votes from "./Votes"

function Cards() {
	const [videos, setVideos] = useState(Videos)
	
	const removeElement = (i) => {
		let newVideos = [...videos]
		newVideos.splice(i, 1)
		setVideos(newVideos)
	}
	return (
		<div className='Cards'>
			{videos.map((video, index) => (
				<div
					key={index}
					title={video.title}
					url={video.url}
					id={video.id}
          			rating={video.rating}
					className='card'>
					<div className='video'>
						<ReactPlayer
							className='video'
							width={380}
							height={300}
							url={video.url}
						/>
					</div>
					<div className='card-body'>
						<h4>{video.title}</h4>
						<p className="ratings">YouTube ratings: {video.rating}</p>
					<Votes/>
						<a
							href={video.url}
							rel='noopener noreferrer'
							className='btn btn-primary'>
							Watch Now
						</a>
						<button
							className='delete'
							onClick={() => removeElement(index)}>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default Cards
