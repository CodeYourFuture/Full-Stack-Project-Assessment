import React, { useState, useEffect } from 'react'
import './VideoList.css'
import Input from './Input'

const VideoList = () => {
	const [videos, setVideos] = useState([])

	useEffect(() => {
		fetch(`https://full-stack-project-assessment-server-kus1.onrender.com/videos`)
			.then((res) => res.json())
			.then((data) => setVideos(data))
			.catch((error) => console.log(error))
	}, [])

	const handleVoteUp = (id) => {
		const updateVideos = videos.map((video) => {
			if (video.id === id) {
				return { ...video, rating: video.rating + 1 }
			}
			return video
		})
		setVideos(updateVideos)
		updateRating(id, updateVideos.find((video) => video.id === id).rating)
	}

	const handleVoteDown = (id) => {
		const updateVideos = videos.map((video) => {
			if (video.id === id) {
				const newRating = Math.max(0, video.rating - 1)
				// Making sure the rating doesn't go below 0
				return { ...video, rating: newRating }
			}
			return video
		})
		setVideos(updateVideos)
		updateRating(id, updateVideos.find((video) => video.id === id).rating)
	}

	const handleDelete = async (id) => {
		const response = await fetch(
			`https://full-stack-project-assessment-server-kus1.onrender.com/videos/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		if (response.ok) {
			setVideos(videos.filter((video) => video.id !== id))
		}
	}

	const handleAddVideo = async (title, url) => {
		const response = await fetch(
			'https://full-stack-project-assessment-server-kus1.onrender.com/videos',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title, url }),
			}
		)
		if (response.ok) {
			const newVideo = await response.json()
			setVideos([...videos, newVideo])
		} else {
			console.log('Error')
		}
	}

	const updateRating = (id, newRating) => {
		fetch(
			`https://full-stack-project-assessment-server-kus1.onrender.com/videos/${id}/rating`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ rating: newRating }),
			}
		)
			.then((res) => res.json)
			.catch((error) => console.log(error))
	}

	return (
		<>
			<Input onAddVideo={handleAddVideo} />
			<div className='box'>
				{videos.map((video) => (
					<div className='card' key={video.id}>
						<h2>{video.title}</h2>
						<div>
							<iframe
								src={video.url}
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								allowFullScreen
							></iframe>
						</div>
						<p>vote: {video.rating}</p>
						<p>Uploaded At: {video.postedAt}</p>
						<div className='group-button'>
							<button onClick={() => handleVoteUp(video.id)}>Vote Up</button>
							<button onClick={() => handleVoteDown(video.id)}>Vote Down</button>
							<button onClick={() => handleDelete(video.id)}>Delete</button>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default VideoList
