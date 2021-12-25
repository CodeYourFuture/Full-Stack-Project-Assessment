import React, { useState, useEffect } from 'react';
import './content.css';
import Form from './Form/Form';
import Video from './Video/Video';
import Sort from './Sort/Sort';

const SERVER = 'http://127.0.0.1:5000';
const Content = () => {
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
		// Вариант без базы данных:
		// setData((prev) => {
		// 	return [...prev, video];
		// });
		console.log(video); /// ?????? тот же вопрос про id
		fetch(`${SERVER}/`, {
			method: 'POST',
			body: JSON.stringify(video),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(video);
				video.id = res[0].id;
				console.log(video);
				setData((prev) => {
					const next = [...prev, video];
					console.log(next); // ????? время уже есть, почему пишет инвалид тайм?
					return next;
				});
				// setData(res);
			});
	};

	const deleteVideo = (videoID) => {
		// Вариант без базы данных:

		// setData((prev) => {
		// 	// let index = prev.findIndex((video) => video.id === videoID); // searching index
		// 	let next = prev.filter((video) => video.id !== videoID);
		// 	return next;
		// });

		fetch(`${SERVER}/${videoID}`, {
			method: 'DELETE',
		})
			.then((res) => {
				if (res.status === 200) {
					setData((prev) => {
						let next = prev.filter((video) => video.id !== videoID);
						return next;
					});
					return;
				}
			})
			.catch((e) => console.error(e));
		// .then((res) => setData(res));
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
