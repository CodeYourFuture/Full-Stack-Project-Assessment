import React from 'react';
import './VideoCardContainer.css';
import VideoCard from './VideoCard';
import { Flex } from '@chakra-ui/layout';

const VideoCardContainer = ({ videos }) => {
	return (
		<Flex className='video-card-container' direction='row' wrap='wrap' justifyContent='space-evenly'>
			{videos.map(videoData => (<VideoCard key={videoData.id} videoData={videoData}/>))}
		</Flex>
	)
}

export default VideoCardContainer;