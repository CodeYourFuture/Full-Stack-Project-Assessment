import React, { useState, useEffect } from 'react';
import './content.css';
import Form from './Form/Form';
import Video from './Video/Video';
import Sort from './Sort/Sort';

const SERVER = 'http://127.0.0.1:5000';
const Content = () => {
	// const fakeJSON = [
	// 	{
	// 		id: 523523,
	// 		title: 'Never Gonna Give You Up',
	// 		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	// 		rating: 23,
	// 	},
	// 	{
	// 		id: 523427,
	// 		title: 'The Coding Train',
	// 		url: 'https://www.youtube.com/watch?v=HerCR8bw_GE',
	// 		rating: 230,
	// 	},
	// 	{
	// 		id: 82653,
	// 		title: 'Mac & Cheese | Basics with Babish',
	// 		url: 'https://www.youtube.com/watch?v=FUeyrEN14Rk',
	// 		rating: 2111,
	// 	},
	// 	{
	// 		id: 858566,
	// 		title: 'Videos for Cats to Watch - 8 Hour Bird Bonanza',
	// 		url: 'https://www.youtube.com/watch?v=xbs7FT7dXYc',
	// 		rating: 11,
	// 	},
	// 	{
	// 		id: 453538,
	// 		title:
	// 			'The Complete London 2012 Opening Ceremony | London 2012 Olympic Games',
	// 		url: 'https://www.youtube.com/watch?v=4As0e4de-rI',
	// 		rating: 3211,
	// 	},
	// 	{
	// 		id: 283634,
	// 		title: "Learn Unity - Beginner's Game Development Course",
	// 		url: 'https://www.youtube.com/watch?v=gB1F9G0JXOo',
	// 		rating: 211,
	// 	},
	// 	{
	// 		id: 562824,
	// 		title: 'Cracking Enigma in 2021 - Computerphile',
	// 		url: 'https://www.youtube.com/watch?v=RzWB5jL5RX0',
	// 		rating: 111,
	// 	},
	// 	{
	// 		id: 442452,
	// 		title: 'Coding Adventure: Chess AI',
	// 		url: 'https://www.youtube.com/watch?v=U4ogK0MIzqk',
	// 		rating: 671,
	// 	},
	// 	{
	// 		id: 536363,
	// 		title: 'Coding Adventure: Ant and Slime Simulations',
	// 		url: 'https://www.youtube.com/watch?v=X-iSQQgOd1A',
	// 		rating: 76,
	// 	},
	// 	{
	// 		id: 323445,
	// 		title: 'Why the Tour de France is so brutal',
	// 		url: 'https://www.youtube.com/watch?v=ZacOS8NBK6U',
	// 		rating: 73,
	// 	},
	// ];

	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		fetch(`${SERVER}/${search}`)
			.then((res) => {
				return res.json();
			})
			.then((list) => {
				setData(list);
			});
	}, [search]);

	const sort = (way) => {
		if (way === 'least') {
			setSearch('?order=asc');
		} else if (way === 'most') {
			setSearch('?order=desc');
		}
	};

	const addNewVideo = (video) => {
		console.log(video);
		setData((prev) => {
			return [...prev, video];
		});
	};

	const deleteVideo = (videoID) => {
		setData((prev) => {
			// let index = prev.findIndex((video) => video.id === videoID); // searching index
			let next = prev.filter((video) => video.id !== videoID);
			return next;
		});
		console.log(data);
	};

	return (
		<div className="container">
			<h2>Add video</h2>
			<Form addNewVideo={addNewVideo}></Form>
			<Sort sort={sort}></Sort>
			<div className="video-section-wrap">
				{data.map((video) => {
					return (
						<Video
							key={video.url.split('=')[1]}
							id={video.id}
							// youtubeID={video.url.slice(32)}
							youtubeID={video.url.split('=')[1]}
							title={video.title}
							rating={video.rating}
							deleteVideo={deleteVideo}
							time={video.time && video.time}
							date={video.date && video.date}
						></Video>
					);
				})}
			</div>
		</div>
	);
};

export default Content;
