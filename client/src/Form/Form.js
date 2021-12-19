import React, { useState } from 'react';
import './form.css';

const Form = ({ addNewVideo }) => {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleUrl = (e) => {
		setUrl(e.target.value);
	};

	const currDate = new Date().toLocaleDateString();
	const currTime = new Date().toLocaleTimeString().slice(0, -3);

	const [titlePlaceholder, setTitlePlaceholder] = useState('Enter title');
	const [urlPlaceholder, setUrlPlaceholder] = useState('Enter URL');

	const handleSend = () => {
		if (title.length === 0) {
			setTitlePlaceholder('Just. Enter. Title.');
			return;
		}
		if (url.length === 0) {
			setUrlPlaceholder('Where is the URL?');
			return;
		}

		let newVideo = {
			title: title,
			url: url,
			rating: 0,
			time: currTime,
			date: currDate,
		};
		addNewVideo(newVideo);
		setTitle('');
		setUrl('');
		setTitlePlaceholder('Enter title');
		setUrlPlaceholder('Enter URL');
	};

	return (
		<div className="form-wrap">
			<form action="submit">
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						placeholder={titlePlaceholder}
						id="title"
						name="title"
						value={title}
						onChange={handleTitle}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="url">URL</label>
					<input
						type="text"
						placeholder={urlPlaceholder}
						id="url"
						name="url"
						value={url}
						onChange={handleUrl}
					/>
				</div>
				<div className="form-group">
					<input type="button" value="Send video" onClick={handleSend} />
				</div>
			</form>
		</div>
	);
};

export default Form;
