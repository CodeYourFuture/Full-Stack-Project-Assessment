import React, { useState } from 'react';
import { AspectRatio, Flex, Box } from "@chakra-ui/react";
import './VideoCard.css';
import thumbsUp from '../images/thumbs-up.svg';
import thumbsDown from '../images/thumbs-down.svg';

const VideoCard = ({ videoData }) => {
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

	const videoID = videoData.url.split('v=');

	return (
		<Box className='video-card' w='30vw' m='3'>
			<AspectRatio maxW="30vw" ratio={16 / 9}>
				<iframe
					title={videoData.title}
					src={`https://www.youtube.com/embed/${videoID[1]}`}
					allowFullScreen
				/>
			</AspectRatio>
			<Flex direction='row' maxH='3rem' p='2' justifyContent='space-between' alignItems='center'>
				<h4 w='50%'>{videoData.title}</h4>
				<Flex direction='row' w='50%' justifyContent='space-around'>
					<a onClick={() => incrementRating()}><img src={thumbsUp} alt='thumbs up' className='thumbs' /></a>
					<Box className='rating'>{ratingNr}</Box>
					<a onClick={() => decrementRating()}><img src={thumbsDown} alt='thumbs down' className='thumbs' /></a>
				</Flex>
			</Flex>
		</Box>
	)
}

export default VideoCard;