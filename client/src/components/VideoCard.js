import React from 'react';
import { AspectRatio } from "@chakra-ui/react"
import './VideoCard.css';
import thumbsUp from '../images/thumbs-up.svg';
import thumbsDown from '../images/thumbs-down.svg';

const VideoCard = ({ videoData }) => {
	const videoID = videoData.url.split('v=');
	return (
		<div className='video-card'>
			<h4>{videoData.title}</h4>

			<AspectRatio maxW="30vw" ratio={16 / 9} className='embedded-video-container'>
				<iframe
					title={videoData.title}
					src={`https://www.youtube.com/embed/${videoID[1]}`}
					allowFullScreen
				/>
			</AspectRatio>
			<div className='rating-container'>
				<img src={thumbsUp} alt='thumbs up' className='thumbs' />
				<div className='rating'>{videoData.rating}</div>
				<img src={thumbsDown} alt='thumbs down' className='thumbs' />
			</div>
		</div>
	)
}

export default VideoCard;