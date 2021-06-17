import React, { useState } from 'react';
import { AspectRatio, Flex, Box } from "@chakra-ui/react";
import './VideoCard.css';
import thumbsUp from '../images/thumbs-up.svg';
import thumbsDown from '../images/thumbs-down.svg';
import deleteIcon from '../images/delete.svg';

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
		const indexOfVid = videosArr.indexOf(videosArr.find(video => video.id === id));
		setVideosArr([...videosArr.slice(indexOfVid + 1)]);
	}

	const videoID = videoData.url.split('v=');

	return (
		<Box className='video-card' w='30vw' overflow='hidden' m='3' boxShadow="md" rounded="md" bg="#E2E8F0">
			<a onClick={() => removeVideo(videoData.id)}><img src={deleteIcon} alt='delete icon' className='thumbs' /></a>
			<AspectRatio w="30vw" ratio={16 / 9} m='0' p='0'>
				<iframe
					title={videoData.title}
					src={`https://www.youtube.com/embed/${videoID[1]}`}
					allowFullScreen
				/>
			</AspectRatio>
			<Flex direction='row' h='4rem' p='2' justifyContent='space-between' alignItems='center'>
				<h4 maxW='70%'>{videoData.title}</h4>
				<Flex direction='row' w='30%' justifyContent='space-around'>
					<a onClick={() => incrementRating()}><img src={thumbsUp} alt='thumbs up' className='thumbs' /></a>
					<Box className='rating'>{ratingNr}</Box>
					<a onClick={() => decrementRating()}><img src={thumbsDown} alt='thumbs down' className='thumbs' /></a>
				</Flex>
			</Flex>
		</Box>
	)
}

export default VideoCard;