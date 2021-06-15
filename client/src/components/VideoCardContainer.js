import React from 'react';
import './VideoCardContainer.css';
import VideoCard from './VideoCard';

const VideoCardContainer = ({ videos }) => {
	return (
		<div className='video-card-container'>
			{videos.map(videoData => (<VideoCard key={videoData.id} videoData={videoData}/>))}
		</div>
	)
}

export default VideoCardContainer;