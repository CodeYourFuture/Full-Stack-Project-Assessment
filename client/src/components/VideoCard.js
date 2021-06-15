import React from 'react';
import './VideoCard.css';

const VideoCard = ({ videoData }) => {
	const videoID = videoData.url.split('v=');
	return (
		<div className='video-card'>
			<h4>{videoData.title}</h4>
			<div className='embedded-video-container'>
				<iframe className="vid" src={`https://www.youtube.com/embed/${videoID[1]}`} allowFullScreen="" title="YouTube video player"></iframe>
			</div>
			<div className='rating'>{videoData.rating}</div>
		</div>
	)
}

export default VideoCard;