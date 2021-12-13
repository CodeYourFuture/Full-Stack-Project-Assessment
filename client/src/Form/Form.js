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

	const handleSend = () => {
		let newVideo = {
			title: title,
			url: url,
			rating: 0,
		};
		addNewVideo(newVideo);
	};

	return (
		<div className="form-wrap">
			<form action="submit">
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						placeholder="Enter title"
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
						placeholder="Enter URL"
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
