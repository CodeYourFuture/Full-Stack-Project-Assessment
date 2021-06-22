import React from 'react';
import './VideoCardContainer.css';
import VideoCard from './VideoCard';
import { Flex } from '@chakra-ui/layout';

const VideoCardContainer = ({ videosArr, setVideosArr }) => {
	return (
		<Flex className='video-card-container' direction='row' wrap='wrap' justifyContent='space-evenly'>
			{videosArr.map(videoData => (<VideoCard key={videoData.id} videoData={videoData}
				videosArr={videosArr} setVideosArr={setVideosArr} />))}
		</Flex>
	)
}

export default VideoCardContainer;