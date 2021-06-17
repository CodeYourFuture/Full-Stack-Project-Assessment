import React, { useState } from 'react';
import { AspectRatio, Flex, Box, Heading, IconButton } from "@chakra-ui/react";
import './VideoCard.css';
import { FaThumbsUp, FaThumbsDown, FaBan } from 'react-icons/fa';

const VideoCard = ({ videoData, videosArr, setVideosArr }) => {
	const [ratingUp, setRatingUp] = useState(false);
	const [ratingDown, setRatingDown] = useState(false);
	const [ratingNr, setRatingNr] = useState(videoData.rating);

	const incrementRating = () => {
		if (!ratingUp) {
			setRatingUp(!ratingUp);
			setRatingNr(ratingNr + 1);
		} else {
			setRatingUp(!ratingUp);
			setRatingNr(ratingNr - 1);
		}
	}

	const decrementRating = () => {
		if (!ratingDown) {
			setRatingDown(!ratingDown);
			setRatingNr(ratingNr - 1);
		} else {
			setRatingDown(!ratingDown);
			setRatingNr(ratingNr + 1);
		}
	}

	const removeVideo = (id) => {
		setVideosArr(videosArr.filter(video => video.id !== id));
	}

	const videoID = videoData.url.split('v=');

	return (
		<Box className='video-card' w={{ lg: '30vw', md: '40vw', sm: '80vw' }} m='3' boxShadow="md" rounded="md">
			<IconButton icon={<FaBan />} onClick={() => removeVideo(videoData.id)} color='red' p='-0.5' className='icons' />
			<AspectRatio w="100%" ratio={16 / 9} m='0' p='0'>
				<iframe
					title={videoData.title}
					src={`https://www.youtube.com/embed/${videoID[1]}`}
					allowFullScreen
				/>
			</AspectRatio>
			<Flex direction='row' h='4rem' p='2' justifyContent='space-between' alignItems='center'>
				<Heading maxW='70%' size='xs'>{videoData.title}</Heading>
				<Flex direction='row' w='30%' justifyContent='space-around' alignItems='center'>
					<IconButton icon={<FaThumbsUp />} onClick={() => incrementRating()} aria-label="Thumbs Up" className='icons' />
					<Box className='rating'>{ratingNr}</Box>
					<IconButton icon={<FaThumbsDown />} onClick={() => decrementRating()} aria-label="Thumbs Down" className='icons' />
				</Flex>
			</Flex>
		</Box>
	)
}

export default VideoCard;